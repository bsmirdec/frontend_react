

export function isUserAdmin() {
    const userPermission = localStorage.getItem('user_permissions');
  
    return userPermission.includes('administrator');
  }


export function isUserSupervisor() {
    const userPermission = localStorage.getItem('user_permissions');
  
    return userPermission.includes('site_supervisor');
  }


export function isUserForeman() {
    const userPermission = localStorage.getItem('user_permissions');
  
    return userPermission.includes('site_foreman');
  }

export function isUserDirector() {
    const userPermission = localStorage.getItem('user_permissions');
  
    return userPermission.includes('site_director');
  }
  