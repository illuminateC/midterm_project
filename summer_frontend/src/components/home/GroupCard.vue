<template>
    <div 
      style="
        box-shadow: rgba(0, 0, 0, 0.1) 0px 12px 24px 0px; 
        background: rgb(255, 255, 255); 
        border-radius: 4px;"
    >
      <div class="tb-navigation-top">
        <div class="tb-navigation-avatar-tooltip-container">
          <div class="avatar-container">
            <img src="https://tcs-devops.aliyuncs.com/thumbnail/112x0d029664519c87ccd41173afd428ce1e/w/200/h/200" class="avatar">
          </div>
        </div>
      </div>
      <ul role="menu" class="next-menu next-ver change-organization-item" style="border-radius: 0px; box-shadow: none; padding-bottom: 0px; padding-top: 0px; width: 240px;">
        <div id="tb-navigation-avatar"></div>
        <li role="menuitem" tabindex="0" class="next-menu-item">
          <div class="next-menu-item-inner">
            <span class="next-menu-item-text">
              <a href="https://account-devops.aliyun.com/settings/profile" target="_blank" rel="noreferrer">个人设置</a>
            </span>
          </div>
        </li>
      </ul>
      <ul 
        role="menu" class="next-menu next-ver tb-navigation-avatar-logout" 
        style="border-top-right-radius: 0px; border-top-left-radius: 0px; box-shadow: none; padding-top: 0px; padding-bottom: 2px; width: 240px;"
      >
        <li role="menuitem" title="退出登录" prefix="next-" tabindex="0" class="next-menu-item">
          <div class="next-menu-item-inner">
            <span class="next-menu-item-text">退出登录</span>
          </div>
        </li>
      </ul>
      <ul 
        role="menu" 
        class="next-menu next-ver change-organization-item change-current-org-item" 
        id="avatarCustomMenu" 
        style="
          max-height: 500px; 
          overflow: auto; 
          border-top: 1px solid var(--color-line1-1, #e8e8e8); 
          box-shadow: none; 
          width: 240px;"
      >
        <li role="menuitem" prefix="next-" tabindex="0" class="next-menu-item switchOrg">
          <div class="next-menu-item-inner">
            <span class="next-menu-item-text">
              <div class="change-organization-container">
                <span class="organization-name">企业</span>
              </div>
              <div class="current-organization">
                <div class="current-organization-name">
                  <img src="https://img.alicdn.com/imgextra/i4/O1CN010tWWPo286StBnm65p_!!6000000007883-0-tps-200-200.jpg">
                  <div>曾通 BUAA-SE-2023 Summer</div>
                </div>
                <span class="switch">切换
                  <i class="tb-navigation-teamix-icon tb-navigation-teamix-medium ">
                    <svg t="1652862242116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19832" width="16" height="16">
                      <path d="M674.024 489.06a40 40 0 0 1 0.132 54.48l-0.82 0.856-220 224.012-57.08-56.056 193.16-196.676-193.844-207.456 58.452-54.616 220 235.456z" p-id="19833"></path>
                    </svg>
                  </i>
                </span>
              </div>
            </span>
          </div>
        </li>
        <li role="menuitem" tabindex="-1" class="next-menu-item">
          <div class="next-menu-item-inner">
            <span class="next-menu-item-text">
              <a href="https://devops.aliyun.com/org-admin/64e570d267559243daa29acc" target="_blank" rel="noreferrer">管理后台</a>
            </span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
.tb-navigation-top .tb-navigation-avatar-tooltip-container {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
}
.tb-navigation-top .tb-navigation-avatar-tooltip-container {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 40px;
    background-color: var(--color-brand1-1,#f0f9ff);
    border-radius: 4px 4px 0 0;
}
.tb-navigation-navbar * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>