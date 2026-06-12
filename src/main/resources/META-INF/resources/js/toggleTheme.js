// 저장된 테마를 페이지 로드 시 복원
function applyStoredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== 'light') return;

    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');

    body.classList.add('light-mode');
    if (btn) btn.textContent = ' LIGHT';
    if (navbar) {
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
    }
}

// 다크/라이트 모드 전환 함수
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');

    // body에 light-mode 클래스 토글 (없으면 추가, 있으면 제거)
    body.classList.toggle('light-mode');

    // 현재 모드에 따라 버튼 텍스트, navbar 색상, localStorage 저장
    if (body.classList.contains('light-mode')) {
        btn.textContent = ' LIGHT';
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
        localStorage.setItem('theme', 'light');
    } else {
        btn.textContent = ' DARK';
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
        localStorage.setItem('theme', 'dark');
    }
}

// DOM 준비 완료 후: 저장된 테마 복원 + 토글 버튼 이벤트 등록
// (head에서 로드되므로 DOMContentLoaded 필수)
document.addEventListener('DOMContentLoaded', function() {
    applyStoredTheme();
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
});
