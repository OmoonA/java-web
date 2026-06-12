const CHAMPION_DETAILS = [
    {
        ko: "아트록스",
        en: "Aatrox",
        role: "전사",
        lane: "탑",
        difficulty: "상",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png",
        desc: "다르킨의 검을 휘두르며 전투를 압도하는 전사입니다.",
    },
    {
        ko: "사일러스",
        en: "Sylas",
        role: "마법사",
        lane: "정글/미드",
        difficulty: "중",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png",
        desc: "상대의 궁극기를 빼앗아 전황을 뒤집는 마법사입니다.",
    },
    {
        ko: "애니비아",
        en: "Anivia",
        role: "마법사",
        lane: "미드",
        difficulty: "상",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png",
        desc: "얼음 마법과 부활 능력으로 전장을 통제하는 마법사입니다.",
    },
    {
        ko: "브라이어",
        en: "Briar",
        role: "전사",
        lane: "정글",
        difficulty: "중",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png",
        desc: "광폭한 돌진과 회복력으로 싸움을 이어가는 전사입니다.",
    },
    {
        ko: "잭스",
        en: "Jax",
        role: "전사",
        lane: "탑",
        difficulty: "상",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png",
        desc: "결투와 지속 교전에 강한 근접 전사입니다.",
    },
    {
        ko: "징크스",
        en: "Jinx",
        role: "원거리 딜러",
        lane: "원딜",
        difficulty: "중",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png",
        desc: "폭발적인 화력으로 교전을 마무리하는 원거리 딜러입니다.",
    },
    {
        ko: "멜",
        en: "Mel",
        role: "마법사",
        lane: "미드",
        difficulty: "상",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Mel.png",
        desc: "마법을 되받아치고 빛의 힘으로 적을 압박하는 마법사입니다.",
    },
    {
        ko: "유나라",
        en: "Yunara",
        role: "원거리 딜러",
        lane: "원딜",
        difficulty: "중",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yunara.png",
        desc: "꾸준한 공격과 신념으로 전투를 이어가는 원거리 딜러입니다.",
    },
    {
        ko: "자헨",
        en: "Zaahen",
        role: "전사",
        lane: "탑",
        difficulty: "상",
        img: "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Zaahen.png",
        desc: "강한 압박과 근접 전투로 앞라인을 책임지는 전사입니다.",
    },
];

function renderChampionCards() {
    const championRow = document.querySelector("section.container.my-5 .row.g-4");
    if (!championRow) return;

    championRow.innerHTML = CHAMPION_DETAILS.map((champ) => `
        <div class="col-md-6 col-lg-4 col-xl-2">
            <div class="card text-center h-100">
                <img src="${champ.img}" class="card-img-top" alt="${champ.ko}" loading="lazy">
                <div class="card-body">
                    <h5 class="card-title">${champ.ko} (${champ.en})</h5>
                    <p class="card-text small">역할: ${champ.role} / 난이도: ${champ.difficulty}</p>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button class="btn btn-outline-secondary w-100" type="button" data-bs-toggle="modal" data-bs-target="#championDetailModal" data-champion="${champ.en}">
                        상세 보기
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function ensureChampionDetailModal() {
    if (document.getElementById("championDetailModal")) return;

    document.body.insertAdjacentHTML("beforeend", `
        <div class="modal fade" id="championDetailModal" tabindex="-1" aria-labelledby="championDetailModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content bg-dark text-white border-secondary">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title" id="championDetailModalLabel"></h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="background: #0a0e17;">
                        <div class="container-fluid p-3">
                            <div class="row g-4">
                                <div class="col-lg-5 text-center">
                                    <img id="championDetailImage" class="img-fluid rounded shadow-lg" alt="" style="max-height: 480px; object-fit: contain;">
                                    <div class="mt-3">
                                        <h3 id="championDetailName" class="mb-1" style="color: #c8aa6e;"></h3>
                                        <p id="championDetailMeta" class="text-muted fs-5"></p>
                                    </div>
                                </div>
                                <div class="col-lg-7">
                                    <h4 class="border-bottom border-secondary pb-2 mb-3" style="color: #c8aa6e;">상세 정보</h4>
                                    <ul class="list-group list-group-flush mb-4">
                                        <li id="championDetailRole" class="list-group-item bg-transparent border-secondary text-white"></li>
                                        <li id="championDetailLane" class="list-group-item bg-transparent border-secondary text-white"></li>
                                        <li id="championDetailDifficulty" class="list-group-item bg-transparent border-secondary text-white"></li>
                                    </ul>
                                    <h4 class="border-bottom border-secondary pb-2 mb-3" style="color: #c8aa6e;">특징</h4>
                                    <p id="championDetailDesc" class="text-secondary lh-lg"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function fillChampionDetailModal(champ) {
    document.getElementById("championDetailModalLabel").textContent = `${champ.ko} (${champ.en}) 상세 정보`;
    document.getElementById("championDetailImage").src = champ.img;
    document.getElementById("championDetailImage").alt = champ.ko;
    document.getElementById("championDetailName").textContent = `${champ.ko} (${champ.en})`;
    document.getElementById("championDetailMeta").textContent = `역할: ${champ.role} / 난이도: ${champ.difficulty}`;
    document.getElementById("championDetailRole").textContent = `역할: ${champ.role}`;
    document.getElementById("championDetailLane").textContent = `추천 라인: ${champ.lane}`;
    document.getElementById("championDetailDifficulty").textContent = `난이도: ${champ.difficulty}`;
    document.getElementById("championDetailDesc").textContent = champ.desc;
}

document.addEventListener("DOMContentLoaded", function () {
    renderChampionCards();
    ensureChampionDetailModal();

    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-champion]");
        if (!button) return;

        const champ = CHAMPION_DETAILS.find((item) => item.en === button.dataset.champion);
        if (champ) fillChampionDetailModal(champ);
    });
});
