/**
 * LEX GLOBAL ADVOCACY LLP — Admin Panel Controller
 * Pure Vanilla JavaScript (No TS/TSX)
 */

(function () {
  'use strict';

  const DS = window.LGA_DATASTORE;
  if (!DS) {
    console.error('LGA_DATASTORE is missing.');
    return;
  }

  // State
  let currentTab = 'dashboard';
  let activeInquiryRef = null;
  let activeAttorneyId = null;
  let activeInsightId = null;

  /* ============================================================
     1. AUTHENTICATION
     ============================================================ */
  function checkAuth() {
    const isAuth = DS.isLoggedIn();
    const loginWrapper = document.getElementById('admin-login-view');
    const layoutWrapper = document.getElementById('admin-app-layout');

    if (isAuth) {
      if (loginWrapper) loginWrapper.style.display = 'none';
      if (layoutWrapper) layoutWrapper.style.display = 'flex';
      const user = DS.getCurrentUser();
      if (user) {
        const nameEl = document.getElementById('user-display-name');
        const roleEl = document.getElementById('user-display-role');
        const avatarEl = document.getElementById('user-avatar-initials');
        if (nameEl) nameEl.textContent = user.name;
        if (roleEl) roleEl.textContent = user.role;
        if (avatarEl) avatarEl.textContent = user.name.charAt(0);
      }
      renderCurrentView();
    } else {
      if (loginWrapper) loginWrapper.style.display = 'flex';
      if (layoutWrapper) layoutWrapper.style.display = 'none';
    }
  }

  function initLogin() {
    const form = document.getElementById('admin-login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('login-username').value.trim();
      const pass = document.getElementById('login-password').value.trim();
      const errBox = document.getElementById('login-error-msg');

      const res = DS.login(user, pass);
      if (res.success) {
        if (errBox) errBox.style.display = 'none';
        showToast('Logged into Lex Global Advocacy Admin Portal', 'fa-shield-halved');
        checkAuth();
      } else {
        if (errBox) {
          errBox.textContent = res.error;
          errBox.style.display = 'block';
        }
      }
    });

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        DS.logout();
        showToast('Logged out safely.', 'fa-arrow-right-from-bracket');
        checkAuth();
      });
    }
  }

  /* ============================================================
     2. NAVIGATION & TAB SWITCHING
     ============================================================ */
  function initNavigation() {
    const links = document.querySelectorAll('.sidebar-nav .nav-link');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-tab');
        if (!tab) return;

        links.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');

        currentTab = tab;
        renderCurrentView();

        // Close mobile drawer if opened
        const sidebar = document.querySelector('.admin-sidebar');
        if (sidebar) sidebar.classList.remove('open');
      });
    });

    // Mobile sidebar toggle
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('.admin-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
      });
    }

    // Quick Action button in topbar
    const addInquiryBtn = document.getElementById('topbar-new-inquiry-btn');
    if (addInquiryBtn) {
      addInquiryBtn.addEventListener('click', () => openNewInquiryModal());
    }

    // Reset database to certified defaults
    const resetBtn = document.getElementById('reset-database-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all inquiries, attorneys, and settings to original certified defaults?')) {
          DS.resetToFactoryDefaults();
          showToast('Data reset to certified defaults', 'fa-rotate');
          renderCurrentView();
        }
      });
    }
  }

  function renderCurrentView() {
    document.querySelectorAll('.view-section').forEach((section) => {
      section.classList.remove('active');
    });

    const activeSection = document.getElementById(`view-${currentTab}`);
    if (activeSection) {
      activeSection.classList.add('active');
    }

    const titleEl = document.getElementById('topbar-page-title');
    if (titleEl) {
      const titles = {
        dashboard: 'Executive Legal Dashboard',
        inquiries: 'Client Inquiries & Case Intakes',
        attorneys: 'Attorneys & Practice Heads',
        'profile-visits': 'Profile Visitors Analytics ("Who Visited My Profile")',
        insights: 'Legal Insights & Publications',
        settings: 'Firm Parameters & Corporate Identity',
        activity: 'Audit & Administrative Activity Logs'
      };
      titleEl.textContent = titles[currentTab] || 'Admin Management';
    }

    if (currentTab === 'dashboard') renderDashboard();
    else if (currentTab === 'inquiries') renderInquiriesTable();
    else if (currentTab === 'attorneys') renderAttorneysTable();
    else if (currentTab === 'profile-visits') renderProfileVisitsTable();
    else if (currentTab === 'insights') renderInsightsTable();
    else if (currentTab === 'settings') renderSettingsForm();
    else if (currentTab === 'activity') renderActivityLog();
  }

  /* ============================================================
     3. DASHBOARD VIEW
     ============================================================ */
  function renderDashboard() {
    const inquiries = DS.getInquiries();
    const attorneys = DS.getAttorneys();
    const insights = DS.getInsights();

    // Metrics
    const newInquiries = inquiries.filter(i => i.status === 'New').length;
    const activeMatters = inquiries.filter(i => i.status === 'In Review' || i.status === 'Action Taken').length;

    const elTotalInquiries = document.getElementById('stat-total-inquiries');
    const elNewInquiries = document.getElementById('stat-new-inquiries');
    const elTotalAttorneys = document.getElementById('stat-total-attorneys');
    const elTotalInsights = document.getElementById('stat-total-insights');
    const badgeSidebar = document.getElementById('sidebar-inquiries-badge');

    if (elTotalInquiries) elTotalInquiries.textContent = inquiries.length;
    if (elNewInquiries) elNewInquiries.textContent = newInquiries;
    if (elTotalAttorneys) elTotalAttorneys.textContent = attorneys.length;
    if (elTotalInsights) elTotalInsights.textContent = insights.length;
    if (badgeSidebar) {
      badgeSidebar.textContent = newInquiries;
      badgeSidebar.style.display = newInquiries > 0 ? 'inline-block' : 'none';
    }

    // Recent Inquiries Table Preview
    const tbody = document.getElementById('dashboard-recent-inquiries-body');
    if (tbody) {
      tbody.innerHTML = '';
      const recent = inquiries.slice(0, 5);
      if (recent.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 24px;">No inquiries found.</td></tr>';
      } else {
        recent.forEach((item) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong style="color: #fff;">${escapeHtml(item.refId)}</strong></td>
            <td>
              <div style="font-weight: 600; color: #fff;">${escapeHtml(item.fullName)}</div>
              <div style="font-size: 12px; color: #64748b;">${escapeHtml(item.email)}</div>
            </td>
            <td><span class="status-pill">${escapeHtml(item.practiceTitle || item.practice)}</span></td>
            <td>${renderStatusPill(item.status)}</td>
            <td>${formatDate(item.timestamp)}</td>
            <td>
              <button type="button" class="table-btn primary" data-action="view-inquiry" data-id="${item.refId}">
                Manage
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    }
  }

  /* ============================================================
     4. INQUIRIES MANAGEMENT
     ============================================================ */
  function renderInquiriesTable() {
    const list = DS.getInquiries();
    const searchInput = document.getElementById('inquiries-search');
    const statusFilter = document.getElementById('inquiries-filter-status');
    const tbody = document.getElementById('inquiries-table-body');
    if (!tbody) return;

    const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
    const filterStatus = (statusFilter ? statusFilter.value : 'all');

    const filtered = list.filter((item) => {
      const matchQuery = !query ||
        item.refId.toLowerCase().includes(query) ||
        item.fullName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        (item.org && item.org.toLowerCase().includes(query)) ||
        (item.notes && item.notes.toLowerCase().includes(query));

      const matchStatus = (filterStatus === 'all') || (item.status === filterStatus);
      return matchQuery && matchStatus;
    });

    tbody.innerHTML = '';
    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 32px;">No matching consultation requests found.</td></tr>';
      return;
    }

    filtered.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: var(--admin-primary);">${escapeHtml(item.refId)}</strong></td>
        <td>
          <div style="font-weight: 600; color: #fff;">${escapeHtml(item.fullName)}</div>
          <div style="font-size: 12px; color: #94a3b8;">${escapeHtml(item.org || 'Individual')}</div>
        </td>
        <td>
          <div><a href="mailto:${escapeHtml(item.email)}" style="color: #cbd5e1;"><i class="fas fa-envelope"></i> ${escapeHtml(item.email)}</a></div>
          <div style="font-size: 12px; color: #94a3b8;"><a href="tel:${escapeHtml(item.phone)}" style="color: #94a3b8;"><i class="fas fa-phone"></i> ${escapeHtml(item.phone)}</a></div>
        </td>
        <td>
          <span style="font-weight: 500;">${escapeHtml(item.practiceTitle || item.practice)}</span>
          <div style="font-size: 11px; color: #64748b;">${escapeHtml(item.mode || 'In-Person')}</div>
        </td>
        <td>${renderStatusPill(item.status)}</td>
        <td><span style="font-size: 12px; color: #94a3b8;">${formatDate(item.timestamp)}</span></td>
        <td>
          <div class="action-btn-group">
            <button type="button" class="table-btn primary" data-action="view-inquiry" data-id="${item.refId}" title="Inspect & Update">
              <i class="fas fa-pen-to-square"></i>
            </button>
            <button type="button" class="table-btn danger" data-action="delete-inquiry" data-id="${item.refId}" title="Delete">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function openInquiryModal(refId) {
    const list = DS.getInquiries();
    const item = list.find(i => i.refId === refId);
    if (!item) return;

    activeInquiryRef = refId;
    const modal = document.getElementById('inquiry-details-modal');
    if (!modal) return;

    document.getElementById('m-inq-ref').textContent = item.refId;
    document.getElementById('m-inq-name').value = item.fullName || '';
    document.getElementById('m-inq-org').value = item.org || '';
    document.getElementById('m-inq-email').value = item.email || '';
    document.getElementById('m-inq-phone').value = item.phone || '';
    document.getElementById('m-inq-practice').value = item.practiceTitle || item.practice || '';
    document.getElementById('m-inq-mode').value = item.mode || 'In-Person (BKC Office)';
    document.getElementById('m-inq-status').value = item.status || 'New';
    document.getElementById('m-inq-priority').value = item.priority || 'Normal';
    document.getElementById('m-inq-assigned').value = item.assignedTo || 'Unassigned';
    document.getElementById('m-inq-notes').value = item.notes || '';
    document.getElementById('m-inq-internal-notes').value = item.internalNotes || '';
    document.getElementById('m-inq-time').textContent = `Received on: ${new Date(item.timestamp).toLocaleString('en-IN')}`;

    modal.classList.add('open');
  }

  function openNewInquiryModal() {
    activeInquiryRef = null;
    const modal = document.getElementById('inquiry-details-modal');
    if (!modal) return;

    const newRef = `LGA-MUM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('m-inq-ref').textContent = newRef;
    document.getElementById('m-inq-name').value = '';
    document.getElementById('m-inq-org').value = '';
    document.getElementById('m-inq-email').value = '';
    document.getElementById('m-inq-phone').value = '';
    document.getElementById('m-inq-practice').value = 'Commercial Litigation & Dispute Resolution';
    document.getElementById('m-inq-mode').value = 'In-Person (BKC Office)';
    document.getElementById('m-inq-status').value = 'New';
    document.getElementById('m-inq-priority').value = 'Normal';
    document.getElementById('m-inq-assigned').value = 'Adv. Rajesh K. Varma';
    document.getElementById('m-inq-notes').value = '';
    document.getElementById('m-inq-internal-notes').value = '';
    document.getElementById('m-inq-time').textContent = 'Direct Admin Entry';

    modal.classList.add('open');
  }

  function saveInquiryFromModal() {
    const ref = document.getElementById('m-inq-ref').textContent;
    const name = document.getElementById('m-inq-name').value.trim();
    if (!name) {
      alert('Client Name is required.');
      return;
    }

    const payload = {
      refId: ref,
      fullName: name,
      org: document.getElementById('m-inq-org').value.trim(),
      email: document.getElementById('m-inq-email').value.trim(),
      phone: document.getElementById('m-inq-phone').value.trim(),
      practiceTitle: document.getElementById('m-inq-practice').value,
      mode: document.getElementById('m-inq-mode').value,
      status: document.getElementById('m-inq-status').value,
      priority: document.getElementById('m-inq-priority').value,
      assignedTo: document.getElementById('m-inq-assigned').value,
      notes: document.getElementById('m-inq-notes').value.trim(),
      internalNotes: document.getElementById('m-inq-internal-notes').value.trim()
    };

    DS.saveInquiry(payload);
    closeAllModals();
    showToast(`Inquiry ${ref} updated successfully!`, 'fa-circle-check');
    renderCurrentView();
  }

  /* ============================================================
     5. ATTORNEYS MANAGEMENT
     ============================================================ */
  function renderAttorneysTable() {
    const list = DS.getAttorneys();
    const tbody = document.getElementById('attorneys-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    list.forEach((attorney) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${escapeHtml(attorney.image)}" alt="" style="width: 44px; height: 44px; border-radius: 4px; object-fit: cover; border: 1px solid var(--admin-border);" />
            <div>
              <strong style="color: #fff; font-size: 14.5px;">${escapeHtml(attorney.name)}</strong>
              <div style="font-size: 12px; color: var(--admin-primary);">${escapeHtml(attorney.role)}</div>
            </div>
          </div>
        </td>
        <td><span class="status-pill">${escapeHtml(attorney.category.toUpperCase())}</span></td>
        <td><span style="font-size: 12.5px; color: #94a3b8;">${escapeHtml(attorney.bar)}</span></td>
        <td>
          <div style="font-size: 13px;">${escapeHtml(attorney.practices.join(', '))}</div>
        </td>
        <td>
          <div class="action-btn-group">
            <button type="button" class="table-btn primary" data-action="edit-attorney" data-id="${attorney.id}">
              <i class="fas fa-pen"></i> Edit
            </button>
            <button type="button" class="table-btn danger" data-action="delete-attorney" data-id="${attorney.id}">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function openAttorneyModal(id) {
    activeAttorneyId = id;
    const modal = document.getElementById('attorney-edit-modal');
    if (!modal) return;

    if (id) {
      const list = DS.getAttorneys();
      const attorney = list.find(a => a.id === id);
      if (!attorney) return;
      document.getElementById('attorney-modal-title').textContent = 'Edit Attorney Profile';
      document.getElementById('att-name').value = attorney.name || '';
      document.getElementById('att-role').value = attorney.role || '';
      document.getElementById('att-category').value = attorney.category || 'partner';
      document.getElementById('att-bar').value = attorney.bar || '';
      document.getElementById('att-exp').value = attorney.experience || '';
      document.getElementById('att-edu').value = attorney.education || '';
      document.getElementById('att-email').value = attorney.email || '';
      document.getElementById('att-phone').value = attorney.phone || '';
      document.getElementById('att-image').value = attorney.image || '';
      document.getElementById('att-practices').value = (attorney.practices || []).join(', ');
      document.getElementById('att-bio').value = attorney.bio || '';
    } else {
      document.getElementById('attorney-modal-title').textContent = 'Add New Attorney';
      document.getElementById('att-name').value = '';
      document.getElementById('att-role').value = 'Partner';
      document.getElementById('att-category').value = 'partner';
      document.getElementById('att-bar').value = 'MAH/..../2024';
      document.getElementById('att-exp').value = '10+ Years Experience';
      document.getElementById('att-edu').value = '';
      document.getElementById('att-email').value = '';
      document.getElementById('att-phone').value = '+91 22 2650 4630';
      document.getElementById('att-image').value = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80';
      document.getElementById('att-practices').value = 'Commercial Litigation, Arbitration';
      document.getElementById('att-bio').value = '';
    }

    modal.classList.add('open');
  }

  function saveAttorneyFromModal() {
    const name = document.getElementById('att-name').value.trim();
    if (!name) {
      alert('Attorney name is required.');
      return;
    }

    const payload = {
      id: activeAttorneyId || undefined,
      name: name,
      role: document.getElementById('att-role').value.trim(),
      category: document.getElementById('att-category').value,
      bar: document.getElementById('att-bar').value.trim(),
      experience: document.getElementById('att-exp').value.trim(),
      education: document.getElementById('att-edu').value.trim(),
      email: document.getElementById('att-email').value.trim(),
      phone: document.getElementById('att-phone').value.trim(),
      image: document.getElementById('att-image').value.trim() || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
      practices: document.getElementById('att-practices').value.split(',').map(s => s.trim()).filter(Boolean),
      bio: document.getElementById('att-bio').value.trim()
    };

    DS.saveAttorney(payload);
    closeAllModals();
    showToast(`Attorney profile ${name} saved and synced to website!`, 'fa-circle-check');
    renderCurrentView();
  }

  /* ============================================================
     5.5 WHO VISITED MANAGEMENT (WEBSITE TRAFFIC & PROFILE VIEWS)
     ============================================================ */
  let activeVisitorSubtab = 'site';

  function renderProfileVisitsTable() {
    if (!DS.getProfileVisits) return;
    const profileVisits = DS.getProfileVisits();
    const siteVisits = DS.getSiteVisits ? DS.getSiteVisits() : [];
    const stats = DS.getSiteStats ? DS.getSiteStats() : { totalVisits: 1842, todayVisits: 129, activeNow: 14 };
    const attorneys = DS.getAttorneys();

    // 1. Update High-Level Metrics
    const statSiteTotal = document.getElementById('stat-site-total-hits');
    const statSiteToday = document.getElementById('stat-site-today-hits');
    const statSiteActive = document.getElementById('stat-site-live-active');
    const statTotalViews = document.getElementById('stat-total-visits');
    const badgeVisits = document.getElementById('sidebar-visits-badge');

    if (statSiteTotal) statSiteTotal.textContent = Number(stats.totalVisits || 1842).toLocaleString();
    if (statSiteToday) statSiteToday.textContent = stats.todayVisits || 129;
    if (statSiteActive) statSiteActive.textContent = stats.activeNow || 14;
    if (statTotalViews) statTotalViews.textContent = profileVisits.length;
    if (badgeVisits) badgeVisits.textContent = profileVisits.length + siteVisits.length;

    // Most viewed advocate
    const counts = {};
    profileVisits.forEach(v => {
      counts[v.attorneyName] = (counts[v.attorneyName] || 0) + 1;
    });
    let topName = '—';
    let topMax = 0;
    Object.keys(counts).forEach(k => {
      if (counts[k] > topMax) {
        topMax = counts[k];
        topName = k;
      }
    });
    const statTopAdv = document.getElementById('stat-top-advocate');
    if (statTopAdv) statTopAdv.textContent = topName !== '—' ? `${topName} (${topMax})` : '—';

    // 2. Render Website Traffic Table
    const siteSearchInput = document.getElementById('site-visits-search-input');
    const siteQuery = siteSearchInput ? siteSearchInput.value.toLowerCase().trim() : '';
    const siteTbody = document.getElementById('site-visits-table-body');

    if (siteTbody) {
      const filteredSite = siteVisits.filter(v => {
        if (!siteQuery) return true;
        return (v.visitorName && v.visitorName.toLowerCase().includes(siteQuery)) ||
               (v.visitorOrg && v.visitorOrg.toLowerCase().includes(siteQuery)) ||
               (v.visitorLocation && v.visitorLocation.toLowerCase().includes(siteQuery)) ||
               (v.action && v.action.toLowerCase().includes(siteQuery)) ||
               (v.details && v.details.toLowerCase().includes(siteQuery)) ||
               (v.path && v.path.toLowerCase().includes(siteQuery));
      });

      siteTbody.innerHTML = '';
      if (filteredSite.length === 0) {
        siteTbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 28px;">No website visits recorded matching your search query.</td></tr>';
      } else {
        filteredSite.forEach((v) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 28px; height: 28px; border-radius: 50%; background: rgba(245, 192, 12, 0.15); color: #f5c00c; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                  <i class="fas fa-user"></i>
                </span>
                <div>
                  <strong style="color: #fff; font-size: 13.5px;">${escapeHtml(v.visitorName || 'Prospective Client')}</strong>
                  <div style="font-size: 11px; color: #64748b;">${escapeHtml(v.visitorDevice || 'Browser')}</div>
                </div>
              </div>
            </td>
            <td>
              <strong style="color: #cbd5e1; font-size: 13px;">${escapeHtml(v.visitorOrg || 'Corporate Entity')}</strong>
              <div style="font-size: 11px; color: #94a3b8;">${escapeHtml(v.visitorIndustry || 'General Commercial')}</div>
            </td>
            <td>
              <span style="color: #38bdf8; font-size: 12.5px;"><i class="fas fa-location-dot" style="font-size: 10px;"></i> ${escapeHtml(v.visitorLocation || 'Mumbai')}</span>
            </td>
            <td>
              <code style="background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 3px; font-size: 12px; color: #facc15;">${escapeHtml(v.path || '/')}</code>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">${escapeHtml(v.details || 'Visited Page')}</div>
            </td>
            <td>
              <span class="status-pill new">${escapeHtml(v.action || 'Visit')}</span>
            </td>
            <td>
              <span style="font-size: 11.5px; color: #94a3b8;">${escapeHtml(v.visitorSource || 'Direct')}</span>
            </td>
            <td>
              <span style="font-size: 12px; color: #cbd5e1;">${formatDate(v.timestamp)}</span>
            </td>
          `;
          siteTbody.appendChild(tr);
        });
      }
    }

    // 3. Render Profile Views Table
    const filterSelect = document.getElementById('visits-filter-attorney');
    if (filterSelect && filterSelect.options.length <= 1) {
      filterSelect.innerHTML = '<option value="all">All Advocates</option>';
      attorneys.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = `${a.name} (${a.role})`;
        filterSelect.appendChild(opt);
      });
    }

    const selectedAtt = filterSelect ? filterSelect.value : 'all';
    const profileSearchInput = document.getElementById('visits-search-input');
    const profileQuery = (profileSearchInput ? profileSearchInput.value.toLowerCase().trim() : '');

    const filteredProfile = profileVisits.filter(v => {
      const matchAtt = (selectedAtt === 'all') || (v.attorneyId === selectedAtt);
      const matchQ = !profileQuery ||
        (v.attorneyName && v.attorneyName.toLowerCase().includes(profileQuery)) ||
        (v.visitorName && v.visitorName.toLowerCase().includes(profileQuery)) ||
        (v.visitorOrg && v.visitorOrg.toLowerCase().includes(profileQuery)) ||
        (v.visitorIndustry && v.visitorIndustry.toLowerCase().includes(profileQuery)) ||
        (v.visitorLocation && v.visitorLocation.toLowerCase().includes(profileQuery));
      return matchAtt && matchQ;
    });

    const profileTbody = document.getElementById('profile-visits-table-body');
    if (profileTbody) {
      profileTbody.innerHTML = '';
      if (filteredProfile.length === 0) {
        profileTbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 28px;">No advocate profile views recorded matching your filters.</td></tr>';
      } else {
        filteredProfile.forEach((v) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>
              <strong style="color: #fff; font-size: 14px;">${escapeHtml(v.attorneyName)}</strong>
              <div style="font-size: 11.5px; color: var(--admin-primary);">${escapeHtml(v.attorneyRole || 'Counsel')}</div>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 28px; height: 28px; border-radius: 50%; background: rgba(56, 189, 248, 0.15); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                  ${(v.visitorName || 'U').charAt(0)}
                </span>
                <div>
                  <span style="font-weight: 600; color: #e2e8f0;">${escapeHtml(v.visitorName || 'Anonymous Corporate Counsel')}</span>
                  <div style="font-size: 11.5px; color: #64748b;">${escapeHtml(v.visitorDevice || 'Web')}</div>
                </div>
              </div>
            </td>
            <td>
              <strong style="color: #cbd5e1;">${escapeHtml(v.visitorOrg || 'Direct Client')}</strong>
            </td>
            <td>
              <div><span class="status-pill">${escapeHtml(v.visitorIndustry || 'Commercial')}</span></div>
              <div style="font-size: 12px; color: #94a3b8; margin-top: 3px;"><i class="fas fa-location-dot" style="font-size: 10px;"></i> ${escapeHtml(v.visitorLocation || 'Mumbai')}</div>
            </td>
            <td>
              <span style="font-size: 12px; color: #94a3b8;"><i class="fas fa-share-nodes" style="color: var(--admin-primary);"></i> ${escapeHtml(v.visitorSource || 'Direct Search')}</span>
            </td>
            <td>
              <span style="font-size: 12px; color: #cbd5e1;">${formatDate(v.timestamp)}</span>
            </td>
          `;
          profileTbody.appendChild(tr);
        });
      }
    }
  }

  /* ============================================================
     6. INSIGHTS MANAGEMENT
     ============================================================ */
  function renderInsightsTable() {
    const list = DS.getInsights();
    const tbody = document.getElementById('insights-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    list.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <strong style="color: #fff; font-size: 14px;">${escapeHtml(item.title)}</strong>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Author: ${escapeHtml(item.author)} | ${escapeHtml(item.date)}</div>
        </td>
        <td><span class="status-pill">${escapeHtml(item.category)}</span></td>
        <td><span class="status-pill action-taken">Published</span></td>
        <td>
          <div class="action-btn-group">
            <button type="button" class="table-btn primary" data-action="edit-insight" data-id="${item.id}">
              <i class="fas fa-pen"></i> Edit
            </button>
            <button type="button" class="table-btn danger" data-action="delete-insight" data-id="${item.id}">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function openInsightModal(id) {
    activeInsightId = id;
    const modal = document.getElementById('insight-edit-modal');
    if (!modal) return;

    if (id) {
      const list = DS.getInsights();
      const ins = list.find(i => i.id === id);
      if (!ins) return;
      document.getElementById('ins-modal-title').textContent = 'Edit Legal Insight';
      document.getElementById('ins-title').value = ins.title || '';
      document.getElementById('ins-category').value = ins.category || '';
      document.getElementById('ins-author').value = ins.author || '';
      document.getElementById('ins-image').value = ins.image || '';
      document.getElementById('ins-summary').value = ins.summary || '';
    } else {
      document.getElementById('ins-modal-title').textContent = 'Publish New Legal Insight';
      document.getElementById('ins-title').value = '';
      document.getElementById('ins-category').value = 'Commercial Law';
      document.getElementById('ins-author').value = 'Adv. Rajesh K. Varma';
      document.getElementById('ins-image').value = 'https://picsum.photos/seed/lga-new-insight/800/500';
      document.getElementById('ins-summary').value = '';
    }

    modal.classList.add('open');
  }

  function saveInsightFromModal() {
    const title = document.getElementById('ins-title').value.trim();
    if (!title) {
      alert('Insight title is required.');
      return;
    }

    const payload = {
      id: activeInsightId || undefined,
      title: title,
      category: document.getElementById('ins-category').value.trim(),
      author: document.getElementById('ins-author').value.trim(),
      image: document.getElementById('ins-image').value.trim() || 'https://picsum.photos/seed/lga-new-insight/800/500',
      summary: document.getElementById('ins-summary').value.trim()
    };

    DS.saveInsight(payload);
    closeAllModals();
    showToast('Legal insight saved and live on website!', 'fa-circle-check');
    renderCurrentView();
  }

  /* ============================================================
     7. SETTINGS & FIRM PARAMETERS
     ============================================================ */
  function renderSettingsForm() {
    const s = DS.getSettings();
    document.getElementById('set-firm-name').value = s.firmName || '';
    document.getElementById('set-llpin').value = s.llpin || '';
    document.getElementById('set-roc').value = s.roc || '';
    document.getElementById('set-inc-date').value = s.incorporationDate || '';
    document.getElementById('set-phone').value = s.phone || '';
    document.getElementById('set-email').value = s.email || '';
    document.getElementById('set-address').value = s.address || '';
    document.getElementById('set-notice').value = s.emergencyNotice || '';
    document.getElementById('set-accepting').checked = s.acceptingInquiries !== false;
  }

  function initSettingsForm() {
    const form = document.getElementById('firm-settings-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        firmName: document.getElementById('set-firm-name').value.trim(),
        llpin: document.getElementById('set-llpin').value.trim(),
        roc: document.getElementById('set-roc').value.trim(),
        incorporationDate: document.getElementById('set-inc-date').value.trim(),
        phone: document.getElementById('set-phone').value.trim(),
        email: document.getElementById('set-email').value.trim(),
        address: document.getElementById('set-address').value.trim(),
        emergencyNotice: document.getElementById('set-notice').value.trim(),
        acceptingInquiries: document.getElementById('set-accepting').checked
      };

      DS.saveSettings(payload);
      showToast('Firm settings updated and synced with live site!', 'fa-circle-check');
    });
  }

  /* ============================================================
     8. ACTIVITY AUDIT LOG
     ============================================================ */
  function renderActivityLog() {
    const logs = DS.getActivityLog();
    const container = document.getElementById('activity-log-list');
    if (!container) return;

    container.innerHTML = '';
    if (logs.length === 0) {
      container.innerHTML = '<div style="padding: 24px; text-align: center; color: #64748b;">No activity logs recorded yet.</div>';
      return;
    }

    logs.forEach((log) => {
      const item = document.createElement('div');
      item.style.cssText = 'padding: 14px 20px; border-bottom: 1px solid var(--admin-border); display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap;';
      item.innerHTML = `
        <div>
          <div style="font-weight: 600; color: #fff;">${escapeHtml(log.action)} — <span style="font-weight: 400; color: #cbd5e1;">${escapeHtml(log.details)}</span></div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Executed by: ${escapeHtml(log.user)} | ${formatDate(log.timestamp)}</div>
        </div>
        <span class="status-pill" style="font-size: 11px;"><i class="fas fa-check"></i> Recorded</span>
      `;
      container.appendChild(item);
    });
  }

  /* ============================================================
     9. EVENT DELEGATION FOR TABLES & BUTTONS
     ============================================================ */
  function initActionDelegation() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');

      if (action === 'view-inquiry') {
        openInquiryModal(id);
      } else if (action === 'delete-inquiry') {
        if (confirm(`Delete inquiry reference ${id}?`)) {
          DS.deleteInquiry(id);
          showToast(`Inquiry ${id} deleted`, 'fa-trash-can');
          renderCurrentView();
        }
      } else if (action === 'new-attorney') {
        openAttorneyModal(null);
      } else if (action === 'edit-attorney') {
        openAttorneyModal(id);
      } else if (action === 'delete-attorney') {
        if (confirm('Are you sure you want to remove this attorney?')) {
          DS.deleteAttorney(id);
          showToast('Attorney removed', 'fa-trash-can');
          renderCurrentView();
        }
      } else if (action === 'new-insight') {
        openInsightModal(null);
      } else if (action === 'edit-insight') {
        openInsightModal(id);
      } else if (action === 'delete-insight') {
        if (confirm('Delete this publication?')) {
          DS.deleteInsight(id);
          showToast('Publication deleted', 'fa-trash-can');
          renderCurrentView();
        }
      }
    });

    // Inquiries search and filter listeners
    const inqSearch = document.getElementById('inquiries-search');
    const inqFilter = document.getElementById('inquiries-filter-status');
    if (inqSearch) inqSearch.addEventListener('input', () => renderInquiriesTable());
    if (inqFilter) inqFilter.addEventListener('change', () => renderInquiriesTable());

    // Modal submit buttons
    const saveInqBtn = document.getElementById('btn-save-inquiry');
    if (saveInqBtn) saveInqBtn.addEventListener('click', saveInquiryFromModal);

    const saveAttBtn = document.getElementById('btn-save-attorney');
    if (saveAttBtn) saveAttBtn.addEventListener('click', saveAttorneyFromModal);

    const saveInsBtn = document.getElementById('btn-save-insight');
    if (saveInsBtn) saveInsBtn.addEventListener('click', saveInsightFromModal);

    // Modal close buttons
    document.querySelectorAll('.admin-modal-close, [data-dismiss="modal"]').forEach((el) => {
      el.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.admin-modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAllModals();
      });
    });

    // Export Inquiries to CSV
    const exportBtn = document.getElementById('export-inquiries-csv-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const inqs = DS.getInquiries();
        if (!inqs.length) {
          alert('No inquiries to export.');
          return;
        }
        let csv = 'Reference ID,Timestamp,Full Name,Organization,Email,Phone,Practice Area,Mode,Status,Priority,Assigned Advocate,Notes\n';
        inqs.forEach(i => {
          csv += `"${i.refId}","${i.timestamp}","${(i.fullName||'').replace(/"/g, '""')}","${(i.org||'').replace(/"/g, '""')}","${i.email}","${i.phone}","${i.practiceTitle||i.practice}","${i.mode}","${i.status}","${i.priority||''}","${i.assignedTo||''}","${(i.notes||'').replace(/"/g, '""')}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `LexGlobal_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        showToast('Exported inquiries to CSV', 'fa-file-excel');
      });
    }

    // Subtab toggle: Website Traffic vs Profile Views
    const tabSite = document.getElementById('admin-tab-site-visits');
    const tabProfile = document.getElementById('admin-tab-profile-visits');
    const cardSite = document.getElementById('admin-card-site-visits');
    const cardProfile = document.getElementById('admin-card-profile-visits');

    if (tabSite && tabProfile) {
      tabSite.addEventListener('click', () => {
        tabSite.classList.add('primary');
        tabProfile.classList.remove('primary');
        if (cardSite) cardSite.style.display = 'block';
        if (cardProfile) cardProfile.style.display = 'none';
        renderProfileVisitsTable();
      });

      tabProfile.addEventListener('click', () => {
        tabProfile.classList.add('primary');
        tabSite.classList.remove('primary');
        if (cardSite) cardSite.style.display = 'none';
        if (cardProfile) cardProfile.style.display = 'block';
        renderProfileVisitsTable();
      });
    }

    // Site Visits Search & Filter
    const siteVisitsSearch = document.getElementById('site-visits-search-input');
    if (siteVisitsSearch) siteVisitsSearch.addEventListener('input', () => renderProfileVisitsTable());

    // Export Site Visits CSV
    const exportSiteVisitsBtn = document.getElementById('btn-export-site-visits-csv');
    if (exportSiteVisitsBtn) {
      exportSiteVisitsBtn.addEventListener('click', () => {
        const visits = DS.getSiteVisits ? DS.getSiteVisits() : [];
        if (!visits.length) {
          alert('No website visits recorded.');
          return;
        }
        let csv = 'Visit ID,Timestamp,Visitor Name,Visitor Organization,Industry,Location,Device,Path,Action,Details,Source\n';
        visits.forEach(v => {
          csv += `"${v.id}","${v.timestamp}","${(v.visitorName||'').replace(/"/g, '""')}","${(v.visitorOrg||'').replace(/"/g, '""')}","${(v.visitorIndustry||'').replace(/"/g, '""')}","${(v.visitorLocation||'').replace(/"/g, '""')}","${(v.visitorDevice||'').replace(/"/g, '""')}","${(v.path||'').replace(/"/g, '""')}","${(v.action||'').replace(/"/g, '""')}","${(v.details||'').replace(/"/g, '""')}","${(v.visitorSource||'').replace(/"/g, '""')}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `LexGlobal_WebsiteTraffic_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        showToast('Exported website traffic visits to CSV', 'fa-file-excel');
      });
    }

    // Simulate Website Visitor Button
    const simSiteBtn = document.getElementById('btn-simulate-site-visitor');
    if (simSiteBtn) {
      simSiteBtn.addEventListener('click', () => {
        const res = DS.simulateSiteVisit();
        showToast(`Simulated site visitor: ${res.visit.visitorName} from ${res.visit.visitorLocation} counted!`, 'fa-globe');
        renderProfileVisitsTable();
      });
    }

    // Profile Visits Filter & Search Listeners
    const visitsAttFilter = document.getElementById('visits-filter-attorney');
    const visitsSearch = document.getElementById('visits-search-input');
    if (visitsAttFilter) visitsAttFilter.addEventListener('change', () => renderProfileVisitsTable());
    if (visitsSearch) visitsSearch.addEventListener('input', () => renderProfileVisitsTable());

    // Export Profile Visits CSV
    const exportVisitsBtn = document.getElementById('btn-export-visits-csv');
    if (exportVisitsBtn) {
      exportVisitsBtn.addEventListener('click', () => {
        const visits = DS.getProfileVisits();
        if (!visits.length) {
          alert('No profile visits recorded.');
          return;
        }
        let csv = 'Visit ID,Timestamp,Advocate Name,Advocate Role,Visitor Name,Visitor Organization,Industry,Location,Device,Source\n';
        visits.forEach(v => {
          csv += `"${v.id}","${v.timestamp}","${(v.attorneyName||'').replace(/"/g, '""')}","${(v.attorneyRole||'').replace(/"/g, '""')}","${(v.visitorName||'').replace(/"/g, '""')}","${(v.visitorOrg||'').replace(/"/g, '""')}","${(v.visitorIndustry||'').replace(/"/g, '""')}","${(v.visitorLocation||'').replace(/"/g, '""')}","${(v.visitorDevice||'').replace(/"/g, '""')}","${(v.visitorSource||'').replace(/"/g, '""')}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `LexGlobal_ProfileVisits_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        showToast('Exported profile visits analytics to CSV', 'fa-file-excel');
      });
    }

    // Simulate Profile Visit Button
    const simulateBtn = document.getElementById('btn-simulate-visit');
    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => {
        const attorneys = DS.getAttorneys();
        if (!attorneys.length) return;
        const target = attorneys[Math.floor(Math.random() * attorneys.length)];
        const simulated = DS.recordProfileVisit(target.id, target.name, target.role);
        showToast(`Simulated profile visit on ${target.name} by ${simulated.visitorName} (${simulated.visitorOrg})`, 'fa-eye');
        renderProfileVisitsTable();
      });
    }

    // Listen for live data updates from main site or another tab
    window.addEventListener('lga-datastore-updated', () => {
      renderCurrentView();
    });
  }

  function closeAllModals() {
    document.querySelectorAll('.admin-modal-overlay').forEach((m) => m.classList.remove('open'));
  }

  /* ============================================================
     10. HELPERS
     ============================================================ */
  function renderStatusPill(status) {
    const s = (status || 'New').toLowerCase();
    if (s.includes('new')) return `<span class="status-pill new"><i class="fas fa-sparkles"></i> New</span>`;
    if (s.includes('review')) return `<span class="status-pill in-review"><i class="fas fa-clock"></i> In Review</span>`;
    if (s.includes('action') || s.includes('active')) return `<span class="status-pill action-taken"><i class="fas fa-check"></i> Action Taken</span>`;
    if (s.includes('close')) return `<span class="status-pill closed"><i class="fas fa-check-double"></i> Closed</span>`;
    return `<span class="status-pill">${escapeHtml(status || 'Normal')}</span>`;
  }

  function formatDate(iso) {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return iso;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(msg, icon = 'fa-info-circle') {
    let t = document.getElementById('admin-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'admin-toast';
      t.className = 'admin-toast';
      document.body.appendChild(t);
    }
    t.innerHTML = `<i class="fas ${icon}"></i> <span>${msg}</span>`;
    t.classList.add('show');
    setTimeout(() => {
      t.classList.remove('show');
    }, 3500);
  }

  /* ============================================================
     11. INIT
     ============================================================ */
  function init() {
    initLogin();
    initNavigation();
    initSettingsForm();
    initActionDelegation();
    checkAuth();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
