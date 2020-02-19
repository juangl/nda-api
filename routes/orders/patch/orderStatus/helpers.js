/**
 * Orders
 *
 * accepted = 1
 * ready = 2
 * picked = 3
 * delivered = 4
 */

const grantedClientStatuses = [1];
const grantedPartnerStatuses = [2];
const grantedAdminStatuses = [3, 4];

function convertStringToStatus(statusString) {
  switch (statusString) {
    case 'accepted':
      return 1;
    case 'ready':
      return 2;
    case 'picked':
      return 3;
    case 'delivered':
      return 4;
    default:
      throw new Error(`Not recognized ${statusString} status`);
  }
}

function canChangeToStatus(statusNumber, role) {
  switch (role) {
    case 'admin':
      return grantedAdminStatuses.includes(statusNumber);
    case 'client':
      return grantedClientStatuses.includes(statusNumber);
    case 'partner':
      return grantedPartnerStatuses.includes(statusNumber);
    default:
      throw new Error(`Not recognized user ${role} role`);
  }
}

module.exports = {
  convertStringToStatus,
  canChangeToStatus,
};
