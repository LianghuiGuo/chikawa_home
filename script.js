// --- 1. 数据定义 ---
const dialogData = {
    jiyi: {
        img: "./assets/jiyi.png",
        texts: [
            "你好呀，我是吉伊",
            "很高兴见到你，你和我一样，是个可爱的宝宝"
        ]
    },
    wusaqi: {
        img: "./assets/wusaqi.png",
        texts: [
            "乌撒奇，到！！！！！！",
            "昨天有个坏蛋欺负你，我替你教训了他"
        ]
    },
    xiaoba: {
        img: "./assets/xiaoba.png",
        texts: [
            "你好，我叫小八",
            "昨天的坏蛋，已经被我们教训了一顿，希望你能原谅他。我们三个永远守护你。"
        ]
    }
};

// --- 2. 状态变量 ---
let currentCharacter = null;
let currentPageIndex = 0;
let typingTimer = null; // 用于存储打字机的timer，方便切换时清除

// DOM 元素
const dialogOverlay = document.getElementById('dialog-overlay');
const dialogImg = document.getElementById('dialog-img');
const dialogText = document.getElementById('dialog-text');
const btnNext = document.getElementById('btn-next');
const btnClose = document.getElementById('btn-close');

// --- 3. 核心功能函数 ---

// 打开对话框
function openDialog(characterKey) {
    currentCharacter = characterKey;
    currentPageIndex = 0; // 重置为第一页

    // 设置图片
    dialogImg.src = dialogData[characterKey].img;
    
    // 显示模态框
    dialogOverlay.classList.remove('hidden');
    
    // 更新按钮状态
    updateButtons();
    
    // 开始播放文字
    playText(dialogData[characterKey].texts[0]);
}

// 播放流式文字 (打字机效果)
function playText(text) {
    // 清除之前的打字任务
    if (typingTimer) clearInterval(typingTimer);
    dialogText.innerHTML = "";
    
    let index = 0;
    typingTimer = setInterval(() => {
        dialogText.innerHTML += text.charAt(index);
        index++;
        if (index >= text.length) {
            clearInterval(typingTimer);
        }
    }, 50); // 每50毫秒打一个字
}

// 点击“下一页”
function nextPage() {
    const totalPages = dialogData[currentCharacter].texts.length;
    
    if (currentPageIndex < totalPages - 1) {
        currentPageIndex++;
        playText(dialogData[currentCharacter].texts[currentPageIndex]);
        updateButtons();
    }
}

// 更新按钮显示逻辑
function updateButtons() {
    const totalPages = dialogData[currentCharacter].texts.length;
    
    // 如果是最后一页，隐藏“下一页”按钮，只显示“关闭”
    // 根据需求描述，对话框包含两个按钮。
    // 为了体验更好，我们在最后一页禁用或隐藏“下一页”，或者让“下一页”变成无效状态
    if (currentPageIndex === totalPages - 1) {
        btnNext.style.display = 'none';
        btnClose.style.display = 'block';
    } else {
        btnNext.style.display = 'block';
        btnClose.style.display = 'block'; // 也可以设计成第一页只有下一页
    }
}

// 关闭对话框
function closeDialog() {
    dialogOverlay.classList.add('hidden');
    if (typingTimer) clearInterval(typingTimer);
}

// --- 4. 流星生成逻辑 ---
function createStars() {
    const starContainer = document.getElementById('star-container');
    const starCount = 10; // 屏幕上同时存在的流星数量

    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        // 随机位置 (从右上角区域发射)
        star.style.top = Math.random() * 50 + '%';
        star.style.left = (Math.random() * 50 + 50) + '%'; 
        // 随机延迟，让它们交替出现
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's'; // 2-4秒划过
        starContainer.appendChild(star);
    }
}

// 初始化流星
createStars();