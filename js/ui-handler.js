// --- STATE ---
let currentTasks = [];
let currentFilter = 'all';

// --- AUTH VISIBILITY ---
export const showLogin = () => {
    document.getElementById('login-view').classList.remove('hidden');
    document.getElementById('app-sidebar').classList.add('hidden');
    document.getElementById('app-main').classList.add('hidden');
};

export const showApp = () => {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('app-sidebar').classList.remove('hidden');
    document.getElementById('app-main').classList.remove('hidden');
    // Default view
    switchView('dashboard');
};

// --- TOAST ---
export const showToast = (msg, isError = false) => {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');
    
    msgEl.innerText = msg;
    
    if(isError) {
        toast.classList.replace('bg-slate-800', 'bg-red-600');
        iconEl.className = 'fas fa-exclamation-circle';
    } else {
        toast.classList.replace('bg-red-600', 'bg-slate-800');
        iconEl.className = 'fas fa-check-circle';
    }

    toast.classList.remove('translate-y-40');
    setTimeout(() => toast.classList.add('translate-y-40'), 3000);
};

// --- VIEW SWITCHING ---
export const switchView = (viewName) => {
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-journal').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(el => {
        el.className = "nav-item w-full text-left px-4 py-3 rounded-lg text-slate-600 font-medium transition hover:bg-slate-50 hover:text-blue-600";
    });

    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    
    const activeClass = "nav-item w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium transition hover:bg-blue-100";
    document.getElementById(`nav-${viewName}`).className = activeClass;
    
    const titles = { 'dashboard': 'Dashboard Tugas', 'journal': 'Jurnal Perjalanan' };
    document.getElementById('page-title').innerText = titles[viewName];
};

// --- MODALS ---
export const openModal = (id, title = null) => {
    document.getElementById(id).classList.remove('hidden');
    if (title && id === 'task-modal') document.getElementById('modal-title').innerText = title;
};

export const closeModal = (id) => {
    document.getElementById(id).classList.add('hidden');
    if (id === 'task-modal') {
        setTimeout(() => {
            document.getElementById('task-form').reset();
            document.getElementById('task-id').value = "";
            document.getElementById('modal-title').innerText = "Tambah Tugas Baru";
        }, 300);
    }
};

// --- RENDER TASKS ---
export const renderTaskList = (tasks) => {
    currentTasks = tasks;
    const listEl = document.getElementById('task-list');
    listEl.innerHTML = '';

    const searchVal = document.getElementById('search-input').value.toLowerCase();
    let filtered = tasks;

    if (currentFilter === 'completed') filtered = tasks.filter(t => t.isCompleted);
    if (currentFilter === 'pending') filtered = tasks.filter(t => !t.isCompleted);
    
    if (searchVal) {
        filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(searchVal) || 
            t.desc.toLowerCase().includes(searchVal)
        );
    }

    if (filtered.length === 0) {
        listEl.innerHTML = `
            <div class="text-center py-10 text-slate-400">
                <i class="fas fa-clipboard-list text-4xl mb-3 opacity-50"></i>
                <p>Tidak ada tugas ditemukan.</p>
            </div>`;
        return;
    }

    filtered.forEach(task => {
        let priorityColor = 'border-l-4 border-l-green-400';
        let priorityBadge = 'bg-green-100 text-green-600';
        
        if(task.priority === 'High') { 
            priorityColor = 'border-l-4 border-l-red-500'; 
            priorityBadge = 'bg-red-100 text-red-600'; 
        } else if (task.priority === 'Medium') { 
            priorityColor = 'border-l-4 border-l-orange-400'; 
            priorityBadge = 'bg-orange-100 text-orange-600'; 
        }

        const titleClass = task.isCompleted ? 'line-through text-slate-400' : 'text-slate-800 font-semibold';
        const cardOpacity = task.isCompleted ? 'opacity-75 bg-slate-50' : 'bg-white';
        const iconClass = task.isCompleted ? 'fas fa-check-circle' : 'far fa-circle';
        const iconColor = task.isCompleted ? 'text-blue-500' : 'text-slate-300 hover:text-blue-500';

        const html = `
        <div class="${cardOpacity} p-4 rounded-xl shadow-sm border border-slate-100 ${priorityColor} flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition duration-200 hover:shadow-md animate-fade-in">
            <div class="flex items-start gap-4 flex-1 w-full">
                <button class="btn-toggle-task mt-1 text-2xl ${iconColor} transition-colors" data-id="${task.id}" data-status="${task.isCompleted}">
                    <i class="${iconClass}"></i>
                </button>
                <div class="w-full">
                    <div class="flex justify-between items-start">
                        <h4 class="${titleClass} text-lg mb-1 transition-all">${task.title}</h4>
                        <span class="text-xs px-2 py-1 rounded-full ${priorityBadge} font-bold md:hidden">${task.priority}</span>
                    </div>
                    <p class="text-sm text-slate-500 mb-2 line-clamp-2">${task.desc}</p>
                    <div class="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                        <span class="flex items-center"><i class="far fa-calendar-alt mr-1.5"></i> ${task.deadline}</span>
                        <span class="flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-600"><i class="fas fa-tag mr-1.5"></i> ${task.category}</span>
                        <span class="hidden md:inline-block px-2 py-0.5 rounded ${priorityBadge}">${task.priority}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-1 self-end md:self-center border-t md:border-t-0 border-slate-100 pt-2 md:pt-0 w-full md:w-auto justify-end">
                <button class="btn-edit-task p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-delete-task p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>`;
        listEl.insertAdjacentHTML('beforeend', html);
    });
};

export const renderJournalList = (journals) => {
    const listEl = document.getElementById('journal-list');
    listEl.innerHTML = '';
    
    if (journals.length === 0) {
        listEl.innerHTML = `<p class="col-span-2 text-center text-slate-400 italic py-8">Belum ada catatan jurnal.</p>`;
        return;
    }

    journals.forEach(j => {
        const date = j.createdAt ? new Date(j.createdAt.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Baru saja';
        const html = `
            <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-sm relative overflow-hidden transform hover:-translate-y-1 transition duration-300 animate-fade-in group">
                <div class="absolute top-0 right-0 w-16 h-16 bg-yellow-200 rounded-bl-full opacity-50 group-hover:scale-110 transition"></div>
                <h4 class="font-bold text-slate-800 text-lg mb-2 relative z-10">${j.title}</h4>
                <p class="text-slate-600 text-sm whitespace-pre-line mb-4 relative z-10">${j.content}</p>
                <div class="text-xs text-slate-500 text-right italic relative z-10 flex justify-end items-center gap-2">
                    <i class="far fa-clock"></i> ${date}
                </div>
            </div>`;
        listEl.insertAdjacentHTML('beforeend', html);
    });
};

export const updateStats = (tasks) => {
    document.getElementById('stat-total').innerText = tasks.length;
    document.getElementById('stat-done').innerText = tasks.filter(t => t.isCompleted).length;
    document.getElementById('stat-pending').innerText = tasks.filter(t => !t.isCompleted).length;
    
    const today = new Date().toISOString().split('T')[0];
    const due = tasks.filter(t => !t.isCompleted && t.deadline <= today).length;
    document.getElementById('stat-due').innerText = due;
};

export const setFilter = (filterType) => {
    currentFilter = filterType;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.dataset.filter === filterType) {
            btn.classList.add('bg-blue-100', 'text-blue-700');
            btn.classList.remove('text-slate-600', 'hover:bg-slate-50');
        } else {
            btn.classList.remove('bg-blue-100', 'text-blue-700');
            btn.classList.add('text-slate-600', 'hover:bg-slate-50');
        }
    });
    renderTaskList(currentTasks); 
};