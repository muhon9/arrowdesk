const allRoles = {
  user: ['getUsers', 'addComment'],
  agent: ['getUsers', 'manageUsers', 'addComment', 'editComment', 'deleteComment'],
  admin: [
    'createTicket',
    'getTicket',
    'getTickets',
    'updateTicket',
    'deleteTicket',
    'manageUsers',
    'getUser',
    'manageTickets',
    'restoreTicket',
    'assignTicket',
    'addComment',
    'editComment',
    'deleteComment',
    'addTags',
    'getCustomers',
    'getCustomer',
    'updateCustomer',
    'deleteCustomer',
    'createCustomer',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
