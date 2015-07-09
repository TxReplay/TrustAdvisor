Router.configure({
  layoutTemplate: 'app_layout',
  notFoundTemplate: 'home'
});
Router.map(function () {
  this.route('home', {
    path: '/',
  }),

  this.route('login', {path: '/login'}),
  this.route('register', {path: '/register'}),
  this.route('explore', {path: '/explore'}),
  this.route('discover', {path: '/discover'}),

  this.route('user', {
    path: 'user/:_id',
    data: function () {
      var user = Meteor.users.findOne(this.params._id);
      return user;
    }
  })
});