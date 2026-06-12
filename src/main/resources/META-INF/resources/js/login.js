// login.js

// ── 로그인 입력값 유효성 검사 (11주차 과제) ──
function validateAndLogin() {
    let valid = true;
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // ① 아이디 검사 : 4~20자 영문/숫자
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        showError('usernameInput', 'usernameMsg', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('usernameInput');
    }

    // ② 패스워드 검사 : 8자 이상, 영문+숫자+특수문자
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordInput', 'passwordMsg', '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearError('passwordInput');
    }

    // ③ 둘 다 통과 시 로그인 실행
    if (valid) submitLogin();
}

// ── 실제 폼 전송 (12주차 암호화 버전, 그대로 유지) ──
async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    const hashed = await hashPassword(password);
    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}

// ── 오류 표시 (인자 3개 버전) ──
function showError(fieldId, msgId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    const msg = document.getElementById(msgId);
    if (msg) msg.textContent = message;
}

// ── 오류 해제 ──
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

// ── 로그인 실패 시 오류 메시지 표시 (12주차) ──
window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error === '1') {
        showError('passwordInput', 'passwordMsg', '아이디 또는 패스워드가 올바르지 않습니다.');
    }
});
