Template.explore.helpers({});

// Events
Template.explore.events({
  'click #link-share': function (e, t) {
    var shareDialogInfo = {
      template: Template.social_popup,
      modalDialogClass: "custom-modal-dialog", //optional
      modalBodyClass: "custom-modal-body", //optional
      modalFooterClass: "custom-modal-footer",//optional
      removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
      doc: {  // Provide data context for Template.appShareDialog
        app: "My Application"
      }
    };

    window.popupLogin = ReactiveModal.initDialog(shareDialogInfo);
    window.popupLogin.show();
  },
  'click #link-visit': function (e, t) {
    var shareDialogInfo = {
      template: Template.visit_new_site,
      modalDialogClass: "custom-modal-dialog", //optional
      modalBodyClass: "custom-modal-body", //optional
      modalFooterClass: "custom-modal-footer",//optional
      removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
      doc: {  // Provide data context for Template.appShareDialog
        app: "My Application"
      }
    };

    window.popupLogin = ReactiveModal.initDialog(shareDialogInfo);
    window.popupLogin.show();
  }

});