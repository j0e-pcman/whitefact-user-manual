import './style.css';

// Module data for better management
interface ModuleData {
  id: string;
  title: string;
  description: string;
  icon: string;
  url?: string;
}

const modules: ModuleData[] = [
  {
    id: 'data-catalog',
    title: 'Data Catalog',
    description: 'การจัดการและจัดหมวดหมู่ข้อมูลแบบครบวงจรสำหรับองค์กร',
    icon: '📊',
    url: 'https://coda.io/d/_dv1IX92vgwF/Tag-Keyword_suK4S'
  },
  {
    id: 'data-inventory',
    title: 'Data Inventory',
    description: 'การตรวจสอบและทำรายการข้อมูลทั้งหมด และ Data Flow (RoPA)',
    icon: '📋',
    url: 'https://coda.io/d/Data-Inventory_dKA9pcNM40x'
  },
  {
    id: 'data-subject-360',
    title: 'Data Subject 360',
    description: 'การจัดการข้อมูลส่วนบุคคลแบบครอบคลุม มุมมอง 360 องศา',
    icon: '👥',
    url: 'https://coda.io/d/Data-Subject-360_dK7htE_zyqj'
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'การประเมินและจัดการความเสี่ยงด้านข้อมูล พร้อมระบบรายงาน',
    icon: '⚠️'
  },
  {
    id: 'dpa',
    title: 'DPA',
    description: 'การประเมินการคุ้มครองข้อมูลส่วนบุคคล และวิเคราะห์ผลกระทบ',
    icon: '📄'
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'การจัดการนโยบายความเป็นส่วนตัว และระบบอัปเดตนโยบาย',
    icon: '🔒'
  },
  {
    id: 'consent-management',
    title: 'Consent Management',
    description: 'การจัดการความยินยอมจากเจ้าของข้อมูล และติดตามการให้ความยินยอม',
    icon: '✅'
  },
  {
    id: 'cookie-management',
    title: 'Cookie Management',
    description: 'การจัดการคุกกี้และการติดตาม ระบบควบคุมตามกฎหมาย',
    icon: '🍪'
  }
];

// Add interactive functionality
function initializeModules() {
  const moduleCards = document.querySelectorAll('.module-card');
  const startButtons = document.querySelectorAll('.start-btn');

  // Add hover effects and click handlers
  moduleCards.forEach((card, index) => {
    const module = modules[index];

    // Add click handler to card
    card.addEventListener('click', () => {
      handleModuleClick(module);
    });

    // Add keyboard navigation
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
        keyEvent.preventDefault();
        handleModuleClick(module);
      }
    });
  });

  // Add click handlers to start buttons
  startButtons.forEach((button, index) => {
    const module = modules[index];

    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click
      handleModuleClick(module);
    });
  });
}

async function handleModuleClick(module: ModuleData) {
  // Add loading state
  const button = document.querySelector(`[data-module="${module.id}"] .start-btn`) as HTMLButtonElement;

  if (button) {
    const originalText = button.textContent;
    button.textContent = 'กำลังโหลด...';
    button.disabled = true;

    // Reset button after operation completes
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  }

  // Show notification
  showNotification(`กำลังโหลดโมดูล: ${module.title}`, 'info');

  // If URL is available, scrape and show content
  if (module.url) {
    await showModuleContent(module);
  } else {
    // For demo purposes, show a placeholder
    showPlaceholderContent(module);
  }
}

async function showModuleContent(module: ModuleData) {
  const mainContent = document.getElementById('main-content');
  const moduleContent = document.getElementById('module-content');
  const contentTitle = document.getElementById('module-title');
  const loadingIndicator = document.getElementById('loading-indicator');
  const contentFrame = document.getElementById('content-frame');

  if (!mainContent || !moduleContent || !contentTitle || !loadingIndicator || !contentFrame) {
    showNotification('เกิดข้อผิดพลาดในการแสดงผล', 'error');
    return;
  }

  // Hide main content and show module content
  mainContent.style.display = 'none';
  moduleContent.style.display = 'block';
  contentTitle.textContent = module.title;

  // Show loading indicator
  loadingIndicator.style.display = 'flex';
  contentFrame.style.display = 'none';

  try {
    // Create iframe to display the external content
    const iframe = document.createElement('iframe');
    iframe.src = module.url || '';
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '6px';

    // Clear previous content and add iframe
    contentFrame.innerHTML = '';
    contentFrame.appendChild(iframe);

    // Hide loading and show content
    setTimeout(() => {
      loadingIndicator.style.display = 'none';
      contentFrame.style.display = 'block';
      showNotification(`โหลดโมดูล ${module.title} เสร็จสิ้น`, 'success');
    }, 2000);

  } catch (error) {
    console.error('Error loading module content:', error);
    loadingIndicator.style.display = 'none';
    contentFrame.innerHTML = `
      <div class="error-message">
        <h3>ไม่สามารถโหลดเนื้อหาได้</h3>
        <p>กรุณาลองใหม่อีกครั้ง หรือ <a href="${module.url}" target="_blank">เปิดลิงก์ต้นฉบับ</a></p>
      </div>
    `;
    contentFrame.style.display = 'block';
    showNotification('เกิดข้อผิดพลาดในการโหลดเนื้อหา', 'error');
  }
}

function showPlaceholderContent(module: ModuleData) {
  const mainContent = document.getElementById('main-content');
  const moduleContent = document.getElementById('module-content');
  const contentTitle = document.getElementById('module-title');
  const loadingIndicator = document.getElementById('loading-indicator');
  const contentFrame = document.getElementById('content-frame');

  if (!mainContent || !moduleContent || !contentTitle || !loadingIndicator || !contentFrame) {
    return;
  }

  // Hide main content and show module content
  mainContent.style.display = 'none';
  moduleContent.style.display = 'block';
  contentTitle.textContent = module.title;

  // Hide loading and show placeholder
  loadingIndicator.style.display = 'none';
  contentFrame.style.display = 'block';
  contentFrame.innerHTML = `
    <div class="placeholder-content">
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">${module.icon}</div>
        <h3>${module.title}</h3>
        <p style="color: #4a5568; margin: 16px 0;">${module.description}</p>
        <p style="color: #718096; font-size: 14px;">โมดูลนี้จะพร้อมใช้งานในเร็วๆ นี้</p>
      </div>
    </div>
  `;

  showNotification(`แสดงข้อมูลโมดูล ${module.title}`, 'info');
}

function setupBackNavigation() {
  const backBtn = document.getElementById('back-btn');
  const mainContent = document.getElementById('main-content');
  const moduleContent = document.getElementById('module-content');

  if (backBtn && mainContent && moduleContent) {
    backBtn.addEventListener('click', () => {
      moduleContent.style.display = 'none';
      mainContent.style.display = 'block';

      // Clear content frame
      const contentFrame = document.getElementById('content-frame');
      if (contentFrame) {
        contentFrame.innerHTML = '';
      }

      showNotification('กลับไปหน้าหลักแล้ว', 'info');
    });
  }
}

function showNotification(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '1000',
    animation: 'slideIn 0.3s ease-out',
    maxWidth: '300px'
  });

  // Set background color based on type
  const colors = {
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };
  notification.style.backgroundColor = colors[type];

  // Add to DOM
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations
function addAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .module-card:focus {
      outline: 2px solid #7c3aed;
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('WhiteFact User Manual initialized');
  addAnimations();
  initializeModules();
  setupBackNavigation();
});

// Add data attributes to cards for easier targeting
document.addEventListener('DOMContentLoaded', () => {
  const moduleCards = document.querySelectorAll('.module-card');
  moduleCards.forEach((card, index) => {
    card.setAttribute('data-module', modules[index].id);
  });
});
