window.addEventListener("load", function(){
    "use strict";

    var currentManipulatedUser = "";
    var data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : null;
    var popFade = document.getElementById("pop-fade");
    var modalToggle = document.getElementsByClassName("btn-modal-toggle");
    var modalHide =  document.getElementsByClassName("modal-close");
    var createUser = document.getElementById("btnCreateUser");
    var addFav = document.getElementById("fav-contact");
    var editContactBtn = document.getElementById("editContactModal");

    // check If edit contact button is clicked in order to send data to modal

    editContactBtn.addEventListener("click", function(){

        document.getElementById("editFullname").value = currentManipulatedUser.fullname;
        document.getElementById("editEmail").value = currentManipulatedUser.email;
        document.getElementById("editPhone").value = currentManipulatedUser.phone;
        document.getElementById("editOtherphone").value = currentManipulatedUser.otherphone;
        document.getElementById("editWebsite").value = currentManipulatedUser.website;
        document.getElementById("editWebsite").value = currentManipulatedUser.website;
        document.getElementById("editFacebook").value = currentManipulatedUser.facebook_id;
        document.getElementById("editInstagram").value = currentManipulatedUser.instagram_id;
        document.getElementById("editLinkedin").value = currentManipulatedUser.linkedin_id;
        document.getElementById("editTwitter").value = currentManipulatedUser.twitter_id;
        document.getElementById("editGoogleplus").value = currentManipulatedUser.googleplus_id;
    })
    // Check if user is among fav contacts

    function checkFav(){
        if (currentManipulatedUser && currentManipulatedUser.fav){
            addFav.style.color = "gold";
            // console.log(currentManipulatedUser);
            return;
        }
        addFav.style.color = "white";
    }


    addFav.addEventListener("click", function(){
        addFavourite();
    }, false);
    var selectedImage = "";
    if (data){
        // console.log(data);
    }else{
        alert("data not found!");
    }


    for (let i = 0; i < modalToggle.length; i++)
        modalToggle[i].addEventListener("click", function(evt){ showModal(evt) }, false);

    for (let i = 0; i < modalHide.length; i++)
        modalHide[i].addEventListener("click", function(evt){ hideModal(evt) }, false);

    function getOwnerDetails(){
        let owner = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : null;
        return owner;
    }

    function getContactById(cid){
        var data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : null;
        return data[cid] || null;
    }

    function addContact(userDetails){
        data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : null;
        if (data){
            if (!data[Object.keys(userDetails)[0]]){
                data = Object.assign(data, userDetails); 
                // Augment entry

                console.log(data);
                localStorage.setItem("contacts", JSON.stringify(data));

                getContacts();
                
                hideModal("", "addUserModal");                

            }else{
                alert("Number already exists!");
            }
        }else{
            // New Entry
            localStorage.setItem("contacts", JSON.stringify(userDetails));
            getContacts();
            
            hideModal("", "addUserModal");
        }
    }

    function logDetails(){
        alert(localStorage.getItem("contacts"));
    }

    function showModal(evt){
        var source = evt.target || evt.srcElement;
        
        popFade.style.display = "block";

        let selectedModal = source.getAttribute("data-modal");

        document.getElementById(selectedModal).style.display = "block";
    }


    function hideModal(evt, modalid = null){
        var source = "";
        if (evt){
            source = evt.target || evt.srcElement;
        }
        let selectedModal = (source && source.getAttribute("data-modal")) || modalid;
        popFade.style.display = "none";
        document.getElementById(selectedModal).style.display = "none";
    }

    createUser.addEventListener("click", function(evt){
        var userObj = getFormData(this);
        userObj[Object.keys(userObj)[0]].photo = selectedImage;
        userObj[Object.keys(userObj)[0]].fav = false;
        addContact(userObj);
        evt.preventDefault();
    });

    btnEditUser.addEventListener("click", function(evt){
        var userObj = getFormData(this);
        userObj[Object.keys(userObj)[0]].photo = selectedImage || currentManipulatedUser.photo;
        console.log(userObj);
        editContact(userObj[Object.keys(userObj)[0]].phone, userObj);
        evt.preventDefault();
    });    


    function getFormData(formId){
        var formData = {}, result = {};
        var formId = formId.getAttribute("data-form");
        var form = document.getElementById(formId);
        for(let i = 0; i < form.elements.length; i++){
            var nodeName = form.elements[i].nodeName;
            if (nodeName == 'INPUT'){
                var nodeType = form.elements[i].type;
                var nodeId = form.elements[i].getAttribute("data-value").trim();
                switch (nodeType){
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        formData[nodeId] = form.elements[i].value.trim();
                        break;
                    default:
                        continue;
                }
            }
        }
        var phoneno = formData['phone'] || "no phone";
        result[phoneno] = formData

        return result;
    }

    function sortStringArray(stringArray){
        return stringArray.sort(function(a,b){
            if (a[0] > b[0])
                return 1;
            else
            if (a[0] < b[0])
                return -1;
        });
    }

    function sortContactList(list){
        var sortable = [];
        var returnObj = [];

        for (let keys in list){
            // console.log(keys);
            // console.log(list[keys]["fullname"]);
            sortable.push([list[keys]["fullname"].toUpperCase(), list[keys]]);
        }

        sortable = sortStringArray(sortable);

        for (let i = 0; i < sortable.length; i++){
            returnObj.push(sortable[i]);
        }

        return returnObj;
    }

    function getContacts(){
        var contactsNode = document.getElementById("myContactList");
        contactsNode.innerHTML = "";
        data = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : null;       
        var contactList = Array.from({length: 26}).map(function(array, index){
            return array = [];
        });
        if(data){
            for (let keys in data){
                if (data.hasOwnProperty(keys)){
                    var arrIndex = (((data[keys]["fullname"]).toUpperCase()).charAt(0)).charCodeAt();
                    contactList[arrIndex-65].push(data[keys]); 
                }
            }

            // console.log(contactList);

            for (let j = 0; j < contactList.length; j++){
                var contactGroup = document.createElement("div");
                contactGroup.className = "contact-group";
            
                var groupAlpha = document.createElement("span");
                groupAlpha.className="group-alpha";
                // contactGroup.appendChild(groupAlpha);

                var listGroup = document.createElement("ul");
                listGroup.className="list-group";
                // contactGroup.appendChild(listGroup);
                if (contactList[j].length > 0){
                    groupAlpha.innerText = String.fromCharCode((j + 65));
                    contactGroup.appendChild(groupAlpha);

                    var sortedContacts = sortContactList(contactList[j]);

                    for (let k = 0; k < sortedContacts.length; k++){
                        var listItem = document.createElement("li");
                        listItem.setAttribute("data-phoneid", sortedContacts[k][1].phone);
                        listItem.innerText = sortedContacts[k][1].fullname; 
                        listGroup.appendChild(listItem);
                        listItem.addEventListener("click", function(){
                            toggleClass("contacts-details", "fade");
                            currentManipulatedUser = data[this.getAttribute("data-phoneid")];
                            changeDetails(currentManipulatedUser);
                            checkFav();
                        });
                    }

                    contactGroup.appendChild(listGroup);
                    contactsNode.appendChild(contactGroup);
                }
            }
        }
    }

    function toggleClass(selectorClass, className){
        var selectedClass = document.getElementsByClassName(selectorClass)[0];
        selectedClass.classList.add(className);
        setTimeout(function(){
            selectedClass.classList.remove(className);
        }, 1700);
    }

    function editContact(contactid, valtoedit = {}){
        for(let keys in valtoedit){
            if (valtoedit.hasOwnProperty(keys)){
                data[contactid][keys] = valtoedit[keys];
            }
        }

        localStorage.setItem("contacts", JSON.stringify(data));
    }

    function changeDetails(userDetails){
        var userImage = userDetails['photo'] || "img/user1.png";
        document.getElementById("cUserName").innerText = userDetails['fullname'].toUpperCase();
        document.getElementById("uPhoneNumber").innerText = userDetails['phone'];
        document.getElementById("uOtherPhone").innerText = userDetails['otherphone'];
        document.getElementById("uEmailAddress").innerText = userDetails['email'];
        document.getElementById("uWebsite").innerText = userDetails['website'];
        document.getElementById("userPhotoSpace").setAttribute("src", userImage);

        document.getElementById("facebookSocialize").setAttribute("href", "http://facebook.com/"+userDetails['facebook_id']);
        document.getElementById("twitterSocialize").setAttribute("href", "http://twitter.com/"+userDetails['twitter_id']);
        document.getElementById("instagramSocialize").setAttribute("href", "http://instagram.com/"+userDetails['instagram_id']);
        document.getElementById("googleSocialize").setAttribute("href", "http://google.com/"+userDetails['googleplus_id']);
        document.getElementById("linkedinSocialize").setAttribute("href", "http://linkedin.com/"+userDetails['linkedin_id']);
    }

    (function(){
        var images = document.getElementsByClassName("usr-image");
        for(let i = 0; i < images.length; i++){
            images[i].addEventListener("click", function(){
                for (let j = 0; j < images.length; j++){
                    images[j].classList.remove("selected-img");
                }
                selectedImage = this.getAttribute("src");
                this.classList.add("selected-img");

            });
        }
    })();

    (getContacts)();

    function addFavourite(){
        if (currentManipulatedUser.fav){
            editContact(currentManipulatedUser.phone, {"fav": false});
            addFav.style.color = "white";
            return;
        }
        editContact(currentManipulatedUser.phone, {"fav": true});
        addFav.style.color = "gold";
    }
});
