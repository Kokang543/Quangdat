// Biến toàn cục
let currentFilterClass = 'all';
let currentSearchKeyword = '';
let speechSynth = window.speechSynthesis;
let currentUtterance = null;

// Hàm dừng thuyết trình
function stopSpeech() {
    if(speechSynth.speaking) speechSynth.cancel();
}

// Hàm bắt đầu đọc
function startSpeech(text) {
    stopSpeech();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'vi-VN';
    currentUtterance.rate = 0.9;
    speechSynth.speak(currentUtterance);
}

// Render toàn bộ ứng dụng (trang chủ hoặc chi tiết)
function renderApp() {
    const hash = window.location.hash.substring(1);
    if(hash.startsWith('post-')) {
        const postId = parseInt(hash.split('-')[1]);
        const post = getPostById(postId);
        if(post) renderDetailPage(post);
        else renderHomePage();
    } else {
        renderHomePage();
    }
}

// Trang chủ
function renderHomePage() {
    let posts = getAllPosts();
    // Lọc theo lớp
    if(currentFilterClass !== 'all') {
        posts = posts.filter(p => p.classLevel == currentFilterClass);
    }
    // Lọc theo từ khóa
    if(currentSearchKeyword.trim() !== '') {
        const kw = currentSearchKeyword.toLowerCase();
        posts = posts.filter(p => p.title.toLowerCase().includes(kw) || p.content.toLowerCase().includes(kw));
    }
    // Bài nổi bật (4 bài mới nhất)
    const trending = [...getAllPosts()].sort((a,b)=>b.id - a.id).slice(0,4);

    const html = `
        <div class="main-grid">
            <div class="posts-list">
                ${posts.map(post => `
                    <article class="post-card">
                        <img class="post-image" src="${post.imageUrl}" onerror="this.src='https://picsum.photos/800/400'">
                        <div class="post-content">
                            <div class="post-category">${post.category} - Lớp ${post.classLevel}</div>
                            <h2 class="post-title"><a href="#post-${post.id}">${escapeHtml(post.title)}</a></h2>
                            <div class="post-excerpt">${escapeHtml(post.content.substring(0,150))}...</div>
                            <div class="post-meta"><span><i class="far fa-calendar-alt"></i> ${post.date}</span><span><i class="far fa-eye"></i> 1,234 lượt xem</span></div>
                        </div>
                    </article>
                `).join('')}
                ${posts.length === 0 ? '<div class="post-card"><div class="post-content"><p>Không có bài viết nào phù hợp.</p></div></div>' : ''}
            </div>
            <div class="sidebar">
                <div class="sidebar-card">
                    <h3 class="sidebar-title"><i class="fas fa-fire"></i> Bài viết nổi bật</h3>
                    ${trending.map((p,idx)=>`
                        <div class="trending-item">
                            <div class="trending-number">${idx+1}</div>
                            <div><strong><a href="#post-${p.id}" style="text-decoration:none; color:#2c3e50;">${escapeHtml(p.title)}</a></strong><br><small>Lớp ${p.classLevel}</small></div>
                        </div>
                    `).join('')}
                </div>
                <div class="sidebar-card">
                    <h3 class="sidebar-title"><i class="fas fa-video"></i> Video bài giảng</h3>
                    <div style="background:#eef2f6; border-radius:8px; padding:40px; text-align:center;">
                        <i class="fas fa-play-circle" style="font-size:48px; color:#0066cc;"></i>
                        <p>Khoá học chất lượng cao</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('appContent').innerHTML = html;
}

// Trang chi tiết có nút thuyết trình
function renderDetailPage(post) {
    const html = `
        <div class="detail-container">
            <a href="#" class="back-btn" id="backHomeBtn"><i class="fas fa-arrow-left"></i> Quay lại trang chủ</a>
            <div class="speech-controls">
                <button id="speechBtn" class="btn btn-speech"><i class="fas fa-volume-up"></i> 🔊 Thuyết trình</button>
                <button id="stopSpeechBtn" class="btn btn-warning"><i class="fas fa-stop"></i> Dừng</button>
            </div>
            <h1>${escapeHtml(post.title)}</h1>
            <div class="post-category">${post.category} - Lớp ${post.classLevel} | ${post.date}</div>
            <img class="detail-image" src="${post.imageUrl}" onerror="this.src='https://picsum.photos/800/400'">
            <div style="font-size:18px; line-height:1.8; margin-top:20px;">${escapeHtml(post.content)}</div>
        </div>
    `;
    document.getElementById('appContent').innerHTML = html;
    // Gắn sự kiện
    document.getElementById('backHomeBtn').onclick = (e) => {
        e.preventDefault();
        stopSpeech();
        window.location.hash = '';
        renderApp();
    };
    document.getElementById('speechBtn').onclick = () => {
        startSpeech(post.title + ". " + post.content);
    };
    document.getElementById('stopSpeechBtn').onclick = () => {
        stopSpeech();
    };
}

// Helper escape HTML
function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
}

// Tạo menu lớp từ 1 đến 12
function buildClassMenu() {
    const container = document.getElementById('classFilter');
    const classes = ['all',1,2,3,4,5,6,7,8,9,10,11,12];
    container.innerHTML = classes.map(c => {
        const label = c === 'all' ? 'Tất cả' : `Lớp ${c}`;
        return `<li><a data-class="${c}" class="${currentFilterClass == c ? 'active' : ''}">${label}</a></li>`;
    }).join('');
    // Gắn sự kiện
    document.querySelectorAll('#classFilter a').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            currentFilterClass = link.getAttribute('data-class');
            buildClassMenu(); // cập nhật active
            renderApp();
        };
    });
}

// Tìm kiếm
function initSearch() {
    document.getElementById('searchBtn').onclick = () => {
        currentSearchKeyword = document.getElementById('searchInput').value;
        renderApp();
    };
    document.getElementById('searchInput').onkeyup = (e) => {
        if(e.key === 'Enter') {
            currentSearchKeyword = e.target.value;
            renderApp();
        }
    };
}

// Khởi chạy
window.onload = () => {
    buildClassMenu();
    initSearch();
    renderApp();
    window.addEventListener('hashchange', () => {
        stopSpeech();
        renderApp();
    });
};
