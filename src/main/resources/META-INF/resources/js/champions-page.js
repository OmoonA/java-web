(function () {
    const CHAMPION_PAGE_DATA = [
        {
            ko: "아트록스",
            en: "Aatrox",
            role: "전사",
            roleKey: "warrior",
            lane: "탑",
            difficulty: "상",
            img: "../images/Aatrox.png",
            desc: "어둠의 검으로 적을 베세요.",
        },
        {
            ko: "사일러스",
            en: "Sylas",
            role: "마법사",
            roleKey: "wizard",
            lane: "정글/미드",
            difficulty: "중",
            img: "../images/Sylas.png",
            desc: "궁극기를 훔치세요!",
        },
        {
            ko: "애니비아",
            en: "Anivia",
            role: "마법사",
            roleKey: "wizard",
            lane: "미드",
            difficulty: "상",
            img: "../images/Anivia.png",
            desc: "얼음으로 적을 봉인하세요.",
        },
        {
            ko: "브라이어",
            en: "Briar",
            role: "전사",
            roleKey: "warrior",
            lane: "정글",
            difficulty: "중",
            img: "../images/Briar.png",
            desc: "광폭한 힘으로 돌진!",
        },
        {
            ko: "잭스",
            en: "Jax",
            role: "전사",
            roleKey: "warrior",
            lane: "탑",
            difficulty: "상",
            img: "../images/Jax.png",
            desc: "대장간의 주인!",
        },
        {
            ko: "징크스",
            en: "Jinx",
            role: "원거리 딜러",
            roleKey: "ad",
            lane: "원딜",
            difficulty: "중",
            img: "../images/Jinx.png",
            desc: "폭발로 적을 날려버리세요.",
        },
        {
            ko: "멜",
            en: "Mel",
            role: "마법사",
            roleKey: "wizard",
            lane: "미드",
            difficulty: "상",
            img: "../images/Mel.png",
            desc: "영혼의 반향",
        },
        {
            ko: "유나라",
            en: "Yunara",
            role: "원거리 딜러",
            roleKey: "ad",
            lane: "원딜",
            difficulty: "중",
            img: "../images/Yunara.png",
            desc: "꺾이지 않는 신념",
        },
        {
            ko: "자헨",
            en: "Zaahen",
            role: "전사",
            roleKey: "warrior",
            lane: "탑",
            difficulty: "상",
            img: "../images/자헨.webp",
            desc: "저물지 않는 자!",
        },
    ];

    const ROLE_LABELS = {
        all: "전체",
        ad: "원거리 딜러",
        assassin: "암살자",
        supporter: "서포터",
        tanker: "탱커",
        warrior: "전사",
        wizard: "마법사",
    };

    function filterChampionsByRole(roleKey) {
        if (roleKey === "all") {
            return CHAMPION_PAGE_DATA;
        }

        return CHAMPION_PAGE_DATA.filter(function (champ) {
            return champ.roleKey === roleKey;
        });
    }

    function renderChampions(roleKey) {
        const championList = document.getElementById("championPageList");
        const roleTitle = document.getElementById("championRoleTitle");
        if (!championList || !roleTitle) return;

        const filteredChampions = filterChampionsByRole(roleKey);
        roleTitle.textContent = ROLE_LABELS[roleKey] + " 챔피언";

        if (filteredChampions.length === 0) {
            championList.innerHTML = `
                <div class="col-12">
                    <div class="champion-empty text-center">
                        <h4>해당 역할군 챔피언이 없습니다.</h4>
                        <p>맨 앞의 로고 버튼을 누르면 전체 챔피언을 다시 볼 수 있습니다.</p>
                    </div>
                </div>
            `;
            return;
        }

        championList.innerHTML = filteredChampions.map(function (champ) {
            return `
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="card champion-page-card text-center h-100">
                        <img src="${champ.img}" class="card-img-top" alt="${champ.ko}" loading="lazy">
                        <div class="card-body">
                            <h5 class="card-title">${champ.ko} (${champ.en})</h5>
                            <p class="card-text small">역할: ${champ.role} / 라인: ${champ.lane}</p>
                            <p class="card-text">${champ.desc}</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <span class="badge champion-role-badge">${champ.difficulty}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    function setActiveRoleButton(button) {
        document.querySelectorAll(".role-filter-btn").forEach(function (item) {
            item.classList.remove("active");
        });
        button.classList.add("active");
    }

    function initChampionPage() {
        document.querySelectorAll(".role-filter-btn").forEach(function (button) {
            button.addEventListener("click", function () {
                setActiveRoleButton(button);
                renderChampions(button.dataset.role);
            });
        });

        renderChampions("all");
    }

    window.CHAMPION_PAGE_DATA = CHAMPION_PAGE_DATA;
    window.filterChampionsByRole = filterChampionsByRole;

    document.addEventListener("DOMContentLoaded", initChampionPage);
})();
