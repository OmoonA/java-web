window.onload = function () {
fetch('/profile/info')
.then(res => res.json())
.then(data => {
// 기존 정보 테이블 표시 (유지)
document.getElementById('infoUsername').textContent = data.username;
document.getElementById('infoEmail').textContent = data.email;
document.getElementById('infoPhone').textContent = data.phone;
if (data.profileImage) {
document.getElementById('profileImg').src =
'/uploads/profile/' + data.profileImage;
}
// 수정 폼에 기존 값 자동 채우기
document.getElementById('updateEmail').value = data.email;
document.getElementById('updatePhone').value = data.phone;
// Tooltip 으로 사용자명 표시 (navUsername span 방식 → 교체)
const profileLink = document.getElementById('profileNavLink');
if (profileLink) {
profileLink.setAttribute('data-bs-title', ' ' + data.username);
new bootstrap.Tooltip(profileLink);
}
});

window.onload = function() {
// 기존 fetch 코드 전체 유지
// URL 파라미터 오류 감지
const params = new URLSearchParams(window.location.search);
const error = params.get('error');
const success = params.get('success');
const msgEl = document.getElementById('updateMsg');
if (success === 'updated') {
msgEl.className = 'alert alert-success';
msgEl.textContent = ' 개인정보가 수정되었습니다.';
} else if (error === 'duplicate_email') {
msgEl.className = 'alert alert-danger';
msgEl.textContent = ' 이미 사용 중인 이메일입니다.';
}
if (error === 'wrong_password') {
// ① Toast 먼저 (즉각 알림)
showToast(' 현재 비밀번호가 일치하지 않습니다.', 'danger');
const pwMsgEl = document.getElementById('pwMsg');
if (pwMsgEl) {
pwMsgEl.className = 'alert alert-danger';
pwMsgEl.textContent = ' 현재 비밀번호가 일치하지 않습니다.';
}
}
if (error) {
const messages = {
'invalid_type': 'jpg, png, gif, webp 파일만 가능합니다.',
'too_large': '파일 크기는 5MB 이하여야 합니다.',
'upload_fail': '업로드 실패. 다시 시도해주세요.'
};
const msg = messages[error];
const div = document.getElementById('uploadErrorMsg');
if (msg && div) {
div.textContent = msg;
div.classList.remove('d-none');
}
}
}

}


// 프로필 수정 폼 유효성 검사 및 제출

function validateAndUpdate() {
let valid = true;
const email = document.getElementById('updateEmail').value.trim();
const phone = document.getElementById('updatePhone').value.trim();
// ① 이메일 형식 검사
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
showFieldError('updateEmail', 'updateEmailMsg',
'올바른 이메일 형식이 아닙니다.');
valid = false;
} else {
clearFieldError('updateEmail');
}
// ② 연락처 형식 검사
const phoneRegex = /^010-\d{4}-\d{4}$/;
if (!phoneRegex.test(phone)) {
showFieldError('updatePhone', 'updatePhoneMsg',
'010-0000-0000 형식으로 입력해주세요.');
valid = false;
} else {
clearFieldError('updatePhone');
}
if (valid) document.getElementById('updateForm').submit();
}
// profile.js 전용 showError / clearError
function showFieldError(fieldId, msgId, message) {
const field = document.getElementById(fieldId);
field.classList.add('is-invalid');
const msg = document.getElementById(msgId);
if (msg) msg.textContent = message;
}
function clearFieldError(fieldId) {
const field = document.getElementById(fieldId);
field.classList.remove('is-invalid');
field.classList.add('is-valid');
}