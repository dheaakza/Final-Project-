import { loginEmail, registerEmail, loginGoogle, logoutUser, monitorAuthState } from "./auth-service.js";
import * as DB from "./db-service.js";
import * as UI from "./ui-handler.js";

let currentUser = null;
let allTasks = [];
let isRegisterMode = false; // Mode login vs register

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AUTH LOGIC ---
    monitorAuthState((user) => {
        if (user) {
            // User Login Sukses
            currentUser = user;
            UI.showApp();
            
            const emailName = user.displayName || user.email.split('@')[0];
            document.getElementById('user-info').innerText = `Halo, ${emailName}`;

            // Subscribe Data
            DB.subscribeToTasks(user.uid, (tasks) => {
                allTasks = tasks;
                UI.renderTaskList(tasks);
                UI.updateStats(tasks);
            });
            DB.subscribeToJournals(user.uid, (journals) => {
                UI.renderJournalList(journals);
            });
        } else {
            // User Belum Login / Logout
            currentUser = null;
            allTasks = [];
            UI.showLogin();
        }
    });

    // Handle Login/Register Form
    document.getElementById('auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const btnSubmit = document.getElementById('btn-submit-auth');
        
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loading...`;

        try {
            if (isRegisterMode) {
                await registerEmail(email, password);
                UI.showToast("Akun berhasil dibuat! Selamat datang.");
            } else {
                await loginEmail(email, password);
                UI.showToast("Login berhasil!");
            }
        } catch (error) {
            let msg = "Terjadi kesalahan.";
            if (error.code === 'auth/invalid-credential') msg = "Email atau password salah.";
            if (error.code === 'auth/email-already-in-use') msg = "Email sudah terdaftar.";
            if (error.code === 'auth/weak-password') msg = "Password terlalu lemah (min 6 karakter).";
            UI.showToast(msg, true);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = isRegisterMode ? "Daftar Akun" : "Masuk";
        }
    });

    // Handle Google Login
    document.getElementById('btn-google-login').addEventListener('click', async () => {
        try {
            await loginGoogle();
            UI.showToast("Login Google Berhasil!");
        } catch (error) {
            UI.showToast("Gagal login dengan Google.", true);
        }
    });

    // Toggle Login <-> Register Mode
    document.getElementById('auth-toggle-btn').addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        
        const title = document.querySelector('#login-view h1');
        const sub = document.querySelector('#login-view p');
        const btn = document.getElementById('btn-submit-auth');
        const toggleText = document.getElementById('auth-toggle-text');
        const toggleBtn = document.getElementById('auth-toggle-btn');

        if(isRegisterMode) {
            title.innerText = "Buat Akun Baru";
            sub.innerText = "Daftar untuk mulai mengatur tugasmu.";
            btn.innerText = "Daftar Akun";
            toggleText.innerText = "Sudah punya akun?";
            toggleBtn.innerText = "Masuk disini";
        } else {
            title.innerText = "Selamat Datang";
            sub.innerText = "Silakan login untuk mengelola tugasmu.";
            btn.innerText = "Masuk";
            toggleText.innerText = "Belum punya akun?";
            toggleBtn.innerText = "Daftar Sekarang";
        }
    });

    document.getElementById('btn-logout').addEventListener('click', async () => {
        if(confirm("Yakin ingin keluar?")) {
            await logoutUser();
            UI.showToast("Berhasil logout.");
        }
    });


    // --- 2. APP LOGIC (Sama seperti sebelumnya) ---
    
    // Navigation
    document.getElementById('nav-dashboard').addEventListener('click', () => UI.switchView('dashboard'));
    document.getElementById('nav-journal').addEventListener('click', () => UI.switchView('journal'));

    // Modals
    document.getElementById('btn-add-task').addEventListener('click', () => UI.openModal('task-modal'));
    document.getElementById('btn-add-journal').addEventListener('click', () => UI.openModal('journal-modal'));
    
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            UI.closeModal(e.currentTarget.getAttribute('data-target'));
        });
    });

    // CRUD - Task
    document.getElementById('task-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskId = document.getElementById('task-id').value;
        const data = {
            title: document.getElementById('task-title').value,
            desc: document.getElementById('task-desc').value,
            deadline: document.getElementById('task-date').value,
            category: document.getElementById('task-category').value,
            priority: document.querySelector('input[name="priority"]:checked').value
        };

        try {
            if(taskId) {
                await DB.updateTask(currentUser.uid, taskId, data);
                UI.showToast("Tugas berhasil diperbarui!");
            } else {
                await DB.addTask(currentUser.uid, data);
                UI.showToast("Tugas baru ditambahkan!");
            }
            UI.closeModal('task-modal');
        } catch(err) {
            console.error(err);
            UI.showToast("Gagal menyimpan data.", true);
        }
    });

    // CRUD - Journal
    document.getElementById('journal-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            title: document.getElementById('journal-title').value,
            content: document.getElementById('journal-content').value
        };
        try {
            await DB.addJournal(currentUser.uid, data);
            UI.showToast("Jurnal berhasil disimpan!");
            UI.closeModal('journal-modal');
            e.target.reset();
        } catch(err) {
            UI.showToast("Gagal menyimpan jurnal.", true);
        }
    });

    // Event Delegation (List Actions)
    document.getElementById('task-list').addEventListener('click', async (e) => {
        const delBtn = e.target.closest('.btn-delete-task');
        if(delBtn) {
            if(confirm("Hapus tugas ini?")) {
                await DB.deleteTask(currentUser.uid, delBtn.dataset.id);
                UI.showToast("Tugas dihapus.");
            }
            return;
        }

        const editBtn = e.target.closest('.btn-edit-task');
        if(editBtn) {
            const task = allTasks.find(t => t.id === editBtn.dataset.id);
            if(task) {
                document.getElementById('task-id').value = task.id;
                document.getElementById('task-title').value = task.title;
                document.getElementById('task-desc').value = task.desc;
                document.getElementById('task-date').value = task.deadline;
                document.getElementById('task-category').value = task.category;
                const radios = document.getElementsByName('priority');
                for(let r of radios) { if(r.value === task.priority) r.checked = true; }
                UI.openModal('task-modal', 'Edit Tugas');
            }
            return;
        }

        const toggleBtn = e.target.closest('.btn-toggle-task');
        if(toggleBtn) {
            const isCompleted = toggleBtn.dataset.status === 'true';
            const newStatus = await DB.toggleTaskCompletion(currentUser.uid, toggleBtn.dataset.id, isCompleted);
            if(newStatus) UI.showToast("Tugas selesai! Kerja bagus!");
        }
    });

    // Filter & Search
    document.getElementById('filter-container').addEventListener('click', (e) => {
        if(e.target.classList.contains('filter-btn')) {
            UI.setFilter(e.target.dataset.filter);
        }
    });

    document.getElementById('search-input').addEventListener('keyup', () => {
        UI.renderTaskList(allTasks);
    });
});