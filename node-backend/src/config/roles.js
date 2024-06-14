const allRoles = {
  user: ['getUsers'],
  agent: ['getUsers', 'manageUsers'],
  admin: [
    'createTicket',
    'getTicket',
    'getTickets',
    'updateTicket',
    'deleteTicket',
    'manageUsers',
    'getUser',
    'manageTickets',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
