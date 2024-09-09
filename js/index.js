let uid = 0;
document.addEventListener("DOMContentLoaded", () => {
  const uid = sessionStorage.getItem("uid");

  fetch(`http://localhost:8080/api/view-all-users/${uid}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "profi"
      ).src = `data:image/png;base64,${data.userProfile}`;
    });

    fetch("http://localhost:8080/api/view-all-users-by-role?roleType=EMPLOYEE")
    .then((response) => response.json())
    .then((data) => {
      data.map((e) => {
        if (document.getElementById("staffData") != null) {
          let tr = document.createElement("tr");

          let userProfileCover = document.createElement("td");
          let userProfile = document.createElement("img");
          userProfile.src = `data:image/png;base64,${e.userProfile}`;
          userProfile.style.width = "50px";
          userProfile.style.height = "50px";
          userProfileCover.appendChild(userProfile);

          let userName = document.createElement("td");
          userName.textContent = e.userName;

          let contactNo = document.createElement("td");
          contactNo.textContent = e.contactNo;

          let email = document.createElement("td");
          email.textContent = e.email;

          let userAddress = document.createElement("td");
          userAddress.textContent = e.userAddress;

          let roleType = document.createElement("td");
          roleType.textContent = e.roleType;

          let buttonCover = document.createElement("td");

          let buttonCoverTwo = document.createElement("div");
          buttonCoverTwo.className = "btn-group dropend";

          let ActionButton = document.createElement("button");
          ActionButton.className = "btn btn-secondary dropdown-toggle";
          ActionButton.setAttribute("data-bs-toggle", "dropdown");
          ActionButton.setAttribute("aria-expanded", "false");
          ActionButton.textContent = "Action";

          let ul = document.createElement("ul");
          ul.className = "dropdown-menu";

          let li1 = document.createElement("li");
          let li2 = document.createElement("li");
          let a1 = document.createElement("a");
          a1.textContent = "Edit";
          a1.className = "dropdown-item";
          a1.href = "#";
          a1.onclick = function () {
            openUpdateStaffModal(
              e.userId,
              e.userName,
              e.userProfile,
              e.contactNo,
              e.email,
              e.userAddress
            );
          };

          let a2 = document.createElement("a");
          a2.className = "dropdown-item";
          a2.textContent = "Delete";
          a2.href = "#";
          a2.onclick = function () {
            deleteStaffById(e.userId);
          };

          li1.appendChild(a1);
          li2.appendChild(a2);
          ul.appendChild(li1);
          ul.appendChild(li2);

          buttonCoverTwo.appendChild(ActionButton);
          buttonCoverTwo.appendChild(ul);

          buttonCover.appendChild(buttonCoverTwo);

          tr.appendChild(userProfileCover);
          tr.appendChild(userName);
          tr.appendChild(contactNo);
          tr.appendChild(email);
          tr.appendChild(userAddress);
          tr.appendChild(roleType);
          tr.appendChild(buttonCover);

          document.getElementById("staffData").appendChild(tr);
        }
      });
    });

    fetch("http://localhost:8080/api/view-all-users-by-role?roleType=USER")
    .then((response) => response.json())
    .then((data) => {
      data.map((e) => {
        if (document.getElementById("userData") != null) {
          let tr = document.createElement("tr");

          let userProfileCover = document.createElement("td");
          let userProfile = document.createElement("img");
          userProfile.src = `data:image/png;base64,${e.userProfile}`;
          userProfile.style.width = "50px";
          userProfile.style.height = "50px";
          userProfileCover.appendChild(userProfile);

          let userName = document.createElement("td");
          userName.textContent = e.userName;

          let contactNo = document.createElement("td");
          contactNo.textContent = e.contactNo;

          let email = document.createElement("td");
          email.textContent = e.email;

          let userAddress = document.createElement("td");
          userAddress.textContent = e.userAddress;

          let roleType = document.createElement("td");
          roleType.textContent = e.roleType;

          let buttonCover = document.createElement("td");

          let buttonCoverTwo = document.createElement("div");
          buttonCoverTwo.className = "btn-group dropend";

          let ActionButton = document.createElement("button");
          ActionButton.className = "btn btn-secondary dropdown-toggle";
          ActionButton.setAttribute("data-bs-toggle", "dropdown");
          ActionButton.setAttribute("aria-expanded", "false");
          ActionButton.textContent = "Action";

          let ul = document.createElement("ul");
          ul.className = "dropdown-menu";

          let li1 = document.createElement("li");
          let li2 = document.createElement("li");
          let a1 = document.createElement("a");
          a1.textContent = "Edit";
          a1.className = "dropdown-item";
          a1.href = "#";
          a1.onclick = function () {
            openUpdateUserModal(
              e.userId,
              e.userName,
              e.userProfile,
              e.contactNo,
              e.email,
              e.userAddress
            );
          };

          let a2 = document.createElement("a");
          a2.className = "dropdown-item";
          a2.textContent = "Delete";
          a2.href = "#";
          a2.onclick = function () {
            deleteUserById(e.userId);
          };

          li1.appendChild(a1);
          li2.appendChild(a2);
          ul.appendChild(li1);
          ul.appendChild(li2);

          buttonCoverTwo.appendChild(ActionButton);
          buttonCoverTwo.appendChild(ul);

          buttonCover.appendChild(buttonCoverTwo);

          tr.appendChild(userProfileCover);
          tr.appendChild(userName);
          tr.appendChild(contactNo);
          tr.appendChild(email);
          tr.appendChild(userAddress);
          tr.appendChild(roleType);
          tr.appendChild(buttonCover);

          document.getElementById("userData").appendChild(tr);
        }
      });
    });

fetch("http://localhost:8080/api/view-all-booking")
.then((response) => response.json())
.then((data) => {
  data.map((e) => {
    if (document.getElementById("bookData") != null) {
      let tr = document.createElement("tr");

      let bookId = document.createElement("td");
      bookId.textContent = e.bookId;

      let userName = document.createElement("td");
      userName.textContent = e.userName;

      let email = document.createElement("td");
      email.textContent = e.email;

      let dateTime = document.createElement("td");
      dateTime.textContent = e.dateTime;

      let specialRequest = document.createElement("td");
      specialRequest.textContent = e.specialRequest;

      let bookingCount = document.createElement("td");
      bookingCount.textContent = e.bookingCount;

      let bookingStatusCover = document.createElement("td");
      let bookStatus = document.createElement("span");
      bookStatus.className = "badge badge-success";
      bookStatus.textContent = e.status;
      bookingStatusCover.appendChild(bookStatus);

      let buttonCover = document.createElement("td");

      let buttonCoverTwo = document.createElement("div");
      buttonCoverTwo.className = "btn-group dropend";

      let ActionButton = document.createElement("button");
      ActionButton.className = "btn btn-secondary dropdown-toggle";
      ActionButton.setAttribute("data-bs-toggle", "dropdown");
      ActionButton.setAttribute("aria-expanded", "false");
      ActionButton.textContent = "Action";

      let ul = document.createElement("ul");
      ul.className = "dropdown-menu";

      let li1 = document.createElement("li");
      let li2 = document.createElement("li");
      let li3 = document.createElement("li");
      let li4 = document.createElement("li");

      let a1 = document.createElement("a");
      a1.textContent = "View";
      a1.className = "dropdown-item";
      a1.href = "#";
      a1.onclick = function () {
        openBookViewModal(
          e.userName,
          e.email,
          e.dateTime,
          e.specialRequest,
          e.bookingCount,
          e.status
        );
      };

    //   let a2 = document.createElement("a");
    //   a2.className = "dropdown-item";
    //   a2.textContent = "Pending";
    //   a2.href = "#";
    //   a2.onclick = function () {
    //     updateBookStatus(
    //       e.bookId,
    //       e.userName,
    //       e.email,
    //       e.dateTime,
    //       e.specialRequest,
    //       e.bookingCount,
    //       "PENDING"
    //     );
    //   };

      let a3 = document.createElement("a");
      a3.className = "dropdown-item";
      a3.textContent = "Verify";
      a3.href = "#";
      a3.onclick = function () {
        updateBookStatus(
          e.bookId,
          e.userName,
          e.email,
          e.dateTime,
          e.specialRequest,
          e.bookingCount,
          "VERIFY"
        );
      };

      let a4 = document.createElement("a");
      a4.className = "dropdown-item";
      a4.textContent = "Delete";
      a4.href = "#";
      a4.onclick = function () {
        deleteBookingById(e.bookId);
      };

      li1.appendChild(a1);
    //   li2.appendChild(a2);
      li3.appendChild(a3);
      li4.appendChild(a4);

      ul.appendChild(li1);
    //   ul.appendChild(li2);
      ul.appendChild(li3);
      ul.appendChild(li4);

      buttonCoverTwo.appendChild(ActionButton);
      buttonCoverTwo.appendChild(ul);

      buttonCover.appendChild(buttonCoverTwo);

      tr.appendChild(bookId);
      tr.appendChild(userName);
      tr.appendChild(email);
      tr.appendChild(dateTime);
      tr.appendChild(specialRequest);
      tr.appendChild(bookingCount);
      tr.appendChild(bookingStatusCover);
      tr.appendChild(buttonCover);

      document.getElementById("bookData").appendChild(tr);
    }
  });
});
});



function openBookViewModal(
    userName,
    email,
    dateTime,
    specialRequest,
    bookingCount,
    status
  ) {
    document.getElementById("viewCustomerName").value = userName;
    document.getElementById("viewEmail").value = email;
    document.getElementById("viewDateTime").value = dateTime;
    document.getElementById("viewSpecialRequest").value = specialRequest;
    document.getElementById("viewGuests").value = bookingCount;
    document.getElementById("viewStatus").value = status;
  
    // Open the update modal
    $("#viewBookingModal").modal("show");
  }
  
  function updateBookStatus(
    bookId,
    userName,
    email,
    dateTime,
    specialRequest,
    bookingCount,
    status
  ) {
    fetch(`http://localhost:8080/api/update-booking/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        dateTime: dateTime,
        bookingCount: bookingCount,
        specialRequest: specialRequest,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          location.reload();
        }
      });
  }
  
  function deleteBookingById(bookId) {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the booking and cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the delete request
        fetch(`http://localhost:8080/api/delete-booking/${bookId}`, {
          method: "DELETE",
        })
        .then((response) => {
          if (response.ok) {
            // Show success alert
            Swal.fire({
              title: 'Deleted!',
              text: 'The booking has been deleted successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              location.reload(); // Reload the page after confirmation
            });
          } else {
            // Show error alert if deletion fails
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the booking. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(() => {
          // Show error alert if there was an issue with the request
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the booking. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }



  
function openUpdateUserModal(
    userIdU,
    userNameU,
    userProfileU,
    contactNoU,
    emailU,
    userAddressU
  ) {
    // Populate the update modal fields with the existing product data
    uid = userIdU;
    document.getElementById("updateUserName").value = userNameU;
    document.getElementById("updateContactNumber").value = contactNoU;
    document.getElementById("updateEmail").value = emailU;
    document.getElementById("updateAddress").value = userAddressU;
    document.getElementById("updateAvatar").files[0] = userProfileU;
  
    // Open the update modal
    $("#updateUserModal").modal("show");
  }
  
  function submitUpdateUserForm() {
    // Get the updated data from the form fields
  
    const userName = document.getElementById("updateUserName").value;
    const contactNo = document.getElementById("updateContactNumber").value;
    const email = document.getElementById("updateEmail").value;
    const userAddress = document.getElementById("updateAddress").value;
    const userProfile = document.getElementById("updateAvatar").files[0];
    const userPassword = document.getElementById("updatePassword").value;
  
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userProfile", userProfile);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("password", userPassword);
    formData.append("userAddress", userAddress);
    formData.append("roleType", "USER");
  
    fetch(`http://localhost:8080/api/update-user/${uid}`, {
      method: "PUT",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
     
      if (data) {
        Swal.fire({
          title: 'Success!',
          text: 'Update successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => location.reload());
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Update failed!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(() => {
      Swal.fire({
        title: 'Error!',
        text: 'Update failed!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  
  $("#updateModal").modal("hide");
  }
  
  function deleteUserById(id) {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the user and cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the delete request
        fetch(`http://localhost:8080/api/delete-user/${id}`, {
          method: "DELETE",
        })
        .then((response) => {
          if (response.ok) {
            // Show success alert
            Swal.fire({
              title: 'Deleted!',
              text: 'The user has been deleted successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              location.reload(); // Reload the page after confirmation
            });
          } else {
            // Show error alert if deletion fails
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the user. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(() => {
          // Show error alert if there was an issue with the request
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the user. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }
  
  
  
  




  function openUpdateStaffModal(
    userIdU,
    userNameU,
    userProfileU,
    contactNoU,
    emailU,
    userAddressU
  ) {
    // Populate the update modal fields with the existing product data
    uid = userIdU;
    document.getElementById("updateStaffName").value = userNameU;
    document.getElementById("updateContactNumber").value = contactNoU;
    document.getElementById("updateEmail").value = emailU;
    document.getElementById("updateAddress").value = userAddressU;
    document.getElementById("updateAvatar").files[0] = userProfileU;
  
    // Open the update modal
    $("#updateStaffModal").modal("show");
  }
  
  function submitUpdateStafForm() {
    // Get the updated data from the form fields
  
    const userName = document.getElementById("updateStaffName").value;
    const contactNo = document.getElementById("updateContactNumber").value;
    const email = document.getElementById("updateEmail").value;
    const userAddress = document.getElementById("updateAddress").value;
    const userProfile = document.getElementById("updateAvatar").files[0];
    const userPassword = document.getElementById("updatePassword").value;
  
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userProfile", userProfile);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("password", userPassword);
    formData.append("userAddress", userAddress);
    formData.append("roleType", "EMPLOYEE");
  
    fetch(`http://localhost:8080/api/update-user/${uid}`, {
      method: "PUT",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
     
      if (data) {
        Swal.fire({
          title: 'Success!',
          text: 'Update successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => location.reload());
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Update failed!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(() => {
      Swal.fire({
        title: 'Error!',
        text: 'Update failed!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  
  $("#updateModal").modal("hide");
  }
  
  function deleteStaffById(id) {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will permanently delete the staff member and cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the delete request
        fetch(`http://localhost:8080/api/delete-user/${id}`, {
          method: "DELETE",
        })
        .then((response) => {
          if (response.ok) {
            // Show success alert
            Swal.fire({
              title: 'Deleted!',
              text: 'The staff member has been deleted successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              location.reload(); // Reload the page after confirmation
            });
          } else {
            // Show error alert if deletion fails
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the staff member. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(() => {
          // Show error alert if there was an issue with the request
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the staff member. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }
  
  
  function submitStaffForm() {
    // Get the updated data from the form fields
    const userName = document.getElementById("staffName").value;
    const contactNo = document.getElementById("contactNumber").value;
    const email = document.getElementById("email").value;
    const userAddress = document.getElementById("address").value;
    const userProfile = document.getElementById("avatar").files[0];
    const userPassword = document.getElementById("password").value;
  
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userProfile", userProfile);
    formData.append("contactNo", contactNo);
    formData.append("email", email);
    formData.append("password", userPassword);
    formData.append("userAddress", userAddress);
    formData.append("roleType", "EMPLOYEE");
  
    fetch(`http://localhost:8080/api/set-user`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // SweetAlert for success
          Swal.fire({
            title: 'Success!',
            text: 'Staff member has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            location.reload(); // Reload the page after confirmation
          });
        } else {
          // SweetAlert for failure
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add the staff member. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(() => {
        // SweetAlert for error handling in case of failure
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the staff member. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  
    // Close the modal after saving the changes
    $("#staffModalLabel").modal("hide");
  }
  