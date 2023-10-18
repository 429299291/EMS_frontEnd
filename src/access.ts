/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  let { currentUser } = initialState ?? {};
  if (!currentUser && localStorage.getItem('currentUserInfo')) {
    currentUser = JSON.parse(localStorage.getItem('currentUserInfo'));
  }
  return {
    // canAdmin: currentUser && currentUser.access === 'admin',
    // canAdmin: currentUser && currentUser.identity === 'admin',
    canDashboard: currentUser && currentUser.accessPermissions?.includes('dashboard'),
    canLiveView: currentUser && currentUser.accessPermissions?.includes('liveView'),
    canAdmin: currentUser && currentUser.accessPermissions?.includes('admin'),
    canSuperAdmin: currentUser && currentUser.accessPermissions?.includes('superAdmin'),
    // canSuperAdmin: currentUser && currentUser.identity === 'superAdmin',
    // canVisitor: currentUser && currentUser.identity === 'visitor',
  };
}
