Template.register.events
(
    {
        'click #submit_user': function (event, template) {
            event.preventDefault();
            var $mail = template.find("#mail");
            var $pass = template.find("#pass");
            var $nom = template.find("#nom");
            var $prenom = template.find("#prenom");
            var $username = template.find("#username");

            if ($mail.value != "" && $pass.value != "" && $nom.value != "" && $prenom.value != "" && $username.value != "") {
                Accounts.createUser( 
                    {
                        email: $mail.value,
                        password: $pass.value,
                        profile: {
                            username: $username.value,
                            nom: $nom.value,
                            prenom: $prenom.value,
                            linkedAcc: 0,
														linkedEbay : false,
														linkedBlabla : false,
														linkedBnb : false
                        }
                    }, function (err) {
                        if (err) {
                            // Inform the user that account creation failed
                            alert('register failed');
                        } else {
                            // Success. Account has been created and the user
                            // has logged in successfully.
                            Router.go('/');
                        }
                    });
            }
        }
    }
);