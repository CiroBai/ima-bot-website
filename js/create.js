// IMA Bot - Create Bot JavaScript

// Simulated user subscription state (in real app, this comes from backend)
let userSubscription = 'free'; // free, plus, pro, ultra
let canCreateBot = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Create page loaded');
});

// Check subscription status
function checkSubscription() {
    const btn = document.getElementById('btn-check-subscription');
    const currentSub = document.getElementById('current-subscription');
    const botAbility = document.getElementById('bot-ability');
    const goPricingBtn = document.getElementById('btn-go-pricing');
    const step2 = document.getElementById('step-2');
    
    // Simulate API call
    btn.textContent = '检查中...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Update based on subscription
        const subNames = {
            'free': '免费版',
            'plus': 'Plus 版',
            'pro': 'Pro 版',
            'ultra': 'Ultra 版'
        };
        
        currentSub.textContent = subNames[userSubscription];
        
        // Determine if can create bot
        if (userSubscription === 'free') {
            canCreateBot = false;
            botAbility.textContent = '❌ 不可创建（需要 Plus 或更高版本）';
            botAbility.style.color = 'var(--danger)';
            goPricingBtn.style.display = 'inline-block';
        } else if (userSubscription === 'plus') {
            canCreateBot = true;
            botAbility.textContent = '✅ Lite 模式';
            botAbility.style.color = 'var(--success)';
            goPricingBtn.style.display = 'none';
            enableLimitedOptions();
        } else if (userSubscription === 'pro') {
            canCreateBot = true;
            botAbility.textContent = '✅ 完整 Bot';
            botAbility.style.color = 'var(--success)';
            goPricingBtn.style.display = 'none';
            enableProOptions();
        } else if (userSubscription === 'ultra') {
            canCreateBot = true;
            botAbility.textContent = '✅ 完整 Bot + 全功能';
            botAbility.style.color = 'var(--success)';
            goPricingBtn.style.display = 'none';
            enableUltraOptions();
        }
        
        btn.textContent = '重新检查';
        btn.disabled = false;
        
        // Show step 2 if can create bot
        if (canCreateBot) {
            step2.style.display = 'block';
            step2.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
}

function enableLimitedOptions() {
    // Plus: Only basic models, no browser/website skills
    const claudeOption = document.getElementById('claude-option');
    const browserSkill = document.getElementById('browser-skill-option');
    const websiteSkill = document.getElementById('website-skill-option');
    
    if (claudeOption) claudeOption.classList.add('disabled');
    if (browserSkill) browserSkill.classList.add('disabled');
    if (websiteSkill) websiteSkill.classList.add('disabled');
}

function enableProOptions() {
    // Pro: Kimi/MiniMax, no Claude, no browser/website
    const claudeOption = document.getElementById('claude-option');
    const browserSkill = document.getElementById('browser-skill-option');
    const websiteSkill = document.getElementById('website-skill-option');
    
    if (claudeOption) claudeOption.classList.add('disabled');
    if (browserSkill) browserSkill.classList.add('disabled');
    if (websiteSkill) websiteSkill.classList.add('disabled');
}

function enableUltraOptions() {
    // Ultra: All models and skills enabled
    const claudeOption = document.getElementById('claude-option');
    const browserSkill = document.getElementById('browser-skill-option');
    const websiteSkill = document.getElementById('website-skill-option');
    
    if (claudeOption) {
        claudeOption.classList.remove('disabled');
        claudeOption.querySelector('input').disabled = false;
    }
    if (browserSkill) {
        browserSkill.classList.remove('disabled');
        browserSkill.querySelector('input').disabled = false;
    }
    if (websiteSkill) {
        websiteSkill.classList.remove('disabled');
        websiteSkill.querySelector('input').disabled = false;
    }
}

// Create Bot
function createBot() {
    // Get selected values
    const model = document.querySelector('input[name="model"]:checked').value;
    const skills = Array.from(document.querySelectorAll('input[name="skill"]:checked')).map(el => el.value);
    const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(el => el.value);
    
    // Validate
    if (skills.length === 0) {
        alert('请至少选择一个 Skill 工具箱');
        return;
    }
    
    // Update summary
    const modelNames = {
        'kimi': 'Kimi',
        'minimax': 'MiniMax',
        'claude': 'Claude'
    };
    
    const skillNames = {
        'image': '图片',
        'video': '视频',
        'audio': '音频',
        'browser': '浏览器',
        'website': '建站'
    };
    
    const platformNames = {
        'whatsapp': 'WhatsApp',
        'telegram': 'Telegram',
        'discord': 'Discord',
        'feishu': '飞书'
    };
    
    document.getElementById('summary-model').textContent = modelNames[model];
    document.getElementById('summary-skills').textContent = skills.map(s => skillNames[s]).join(' + ');
    document.getElementById('summary-platforms').textContent = platforms.length > 0 
        ? platforms.map(p => platformNames[p]).join(' + ') 
        : '未选择';
    
    // Show success step
    document.getElementById('step-3').style.display = 'block';
    document.getElementById('step-3').scrollIntoView({ behavior: 'smooth' });
}

// Start chat
function startChat() {
    alert('功能开发中... 将跳转到对话页面');
}

// Configure platform
function configurePlatform() {
    alert('功能开发中... 将跳转到平台配置页面');
}

// For demo purposes - allow switching subscription
function setDemoSubscription(level) {
    userSubscription = level;
    checkSubscription();
}
