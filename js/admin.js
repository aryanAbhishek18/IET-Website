var requrl = "http://localhost:3000/api";

$.ajax({
    url: requrl + "/techdesk",
    type: 'GET',
    success: function(res) {
        if(res.success===false) {
            alert(res.msg);
            window.location.href = "login.html";
            return;
        }
        res.posts.forEach(function(post) {
            $("#posts").append(`
            <div class="col-md-4 col-sm-6 techdesk-container">
                <div class="card" style="width: 100%;">
                <img src="./images/${post.image}" class="card-img-top img-responsive" style="width:100%; height: 40vh" alt="...">
                <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <ul class="blog-meta">
                        <li><span><i class="fa fa-user" aria-hidden="true"></i>
                        </span> <a href="#">${post.author}</a></li>
                        <li><span><i class="fa fa-calendar" aria-hidden="true"></i>
                        </span> <a href="#">${post.postdate.substr(0,10)}</a></li>
                </ul>
                <hr>
                <a href="" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="return getPostDetails('${post._id}')">More Info</a>
            </div><br>`);
        });
    },
    error: function(){
        alert("Error! Please try again");
        window.location.href="login.html";
        return;
    }
});

function getPostDetails(id) {
    $.ajax({
        type: "GET",
        url: requrl + "/techdesk/post/" + id,
        success: function(res) {
            if(res.success===false) {
                alert(res.msg);
                window.location.href = "admin.html";
                return;
            }
            var post = res.post;
            $("#editTitle").val(post.title);
            $('#editDesc').summernote({
                dialogsInBody: true,
            });
            $("#editDesc").summernote('code', post.description);
            $("#editAuthor").val(post.author);
            $("#editImage").val(post.image);
            $("#editHiddenInput").val(post._id);
            $("#deleteHiddenInput").val(post._id);
        },
        error: function (xhr, ajaxOptions, thrownError){
            alert("Error! Please try again");
            window.location.href="admin.html";
            return;
        }
    });
    return false;
}

$('#newpost').submit(function(e){
    e.preventDefault();
    let loadingText="<i class='fa fa-circle-o-notch fa-spin'></i> Submitting"
    $('#submitpost').html(loadingText);
    $('#submitpost').prop('disabled',true);

    var title = $("#postTitle").val().trim();
    var description = $('#postDesc').summernote('code');
    var author = $('#postAuthor').val().trim();
    var password = $('#adminPass').val();
    var image = $('#postImage').val();
    if(title==="" || description==="" || author==="" || password==="" || image==="")
    {
        $("#error-message").text("*Some Fields are empty!");
        $("#error-message").css("color", "red");
        $('#submitpost').html('Submit');
        $('#submitpost').prop('disabled', false);
        return false;
    }
    $.ajax({
        url: requrl + "/admin/techdesk/post/add",
        type: 'POST',
        headers: {
            'x-auth': window.localStorage.getItem('x-auth')
        },
        data: {
            title,
            description,
            author,
            image,
            password
        },
        success: function(res) {
            if(res.success === true){
                $("#error-message").text("*Post Addded Successfully!");
                $("#error-message").css("color","green");
                setTimeout(function(){
                    window.location.href = "admin.html";
                },1000);
            }
            else{
                $("#error-message").text("*"+res.msg);
                $("#error-message").css("color", "red");
                $('#submitpost').html('Submit');
                $('#submitpost').prop('disabled', false);
                return false;
            }
        },
        error: function(){
            $("#error-message").text("*Error! Please try again.");
            $("#error-message").css("color","red");
            $('#submitpost').html('Submit');
            $('#submitpost').prop('disabled', false);
        }
    });
    return false;
});

$('#editPost').submit(function(e){
    e.preventDefault();
    let loadingText="<i class='fa fa-circle-o-notch fa-spin'></i> Updating"
    $('#editPostBtn').html(loadingText);
    $('#editPostBtn').prop('disabled',true);

    var title = $("#editTitle").val().trim();
    var description = $('#editDesc').val().trim();
    var author = $('#editAuthor').val().trim();
    var password = $('#editAdminPass').val();
    var image = $('#editImage').val();
    var id = $('#editHiddenInput').val();
    if(title==="" || description==="" || author==="" || password==="" || id==="" || image==="")
    {
        $("#error-message2").text("*Some Fields are empty!");
        $("#error-message2").css("color", "red");
        $('#editPostBtn').html('Update');
        $('#editPostBtn').prop('disabled', false);
        return false;
    }
    $.ajax({
        url: requrl + "/admin/techdesk/post/edit/" + id,
        type: 'POST',
        headers: {
            'x-auth': window.localStorage.getItem('x-auth')
        },
        data: {
            title,
            description,
            author,
            image,
            password
        },
        success: function(res) {
            if(res.success === true){
                $("#error-message2").text("*Post Updated Successfully!");
                $("#error-message2").css("color","green");
                setTimeout(function(){
                    window.location.href = "admin.html";
                },1000);
            }
            else{
                $("#error-message2").text("*"+res.msg);
                $("#error-message2").css("color", "red");
                $('#editPostBtn').html('Update');
                $('#editPostBtn').prop('disabled', false);
                return false;
            }
        },
        error: function(){
            $("#error-message2").text("*Error! Please try again.");
            $("#error-message2").css("color","red");
            $('#editPostBtn').html('Update');
            $('#editPostBtn').prop('disabled', false);
        }
    });
    return false;
});


$('#deletePost').submit(function(e){
    e.preventDefault();
    let loadingText="<i class='fa fa-circle-o-notch fa-spin'></i> Deleting"
    $('#deletePostBtn').html(loadingText);
    $('#deletePostBtn').prop('disabled',true);

    var password = $('#editAdminPass').val();
    var id = $('#deleteHiddenInput').val();
    if(password==="" || id==="")
    {
        $("#error-message2").text("*Please Enter Password");
        $("#error-message2").css("color", "red");
        $('#deletePostBtn').html('Delete');
        $('#deletePostBtn').prop('disabled', false);
        return false;
    }
    $.ajax({
        url: requrl + "/admin/techdesk/post/delete/" + id,
        type: 'POST',
        data: {
            password
        },
        headers: {
            'x-auth': window.localStorage.getItem('x-auth')
        },
        success: function(res) {
            if(res.success === true){
                $("#error-message2").text("*Post Deleted Successfully!");
                $("#error-message2").css("color","green");
                setTimeout(function(){
                    window.location.href = "admin.html";
                },1000);
            }
            else{
                $("#error-message2").text("*"+res.msg);
                $("#error-message2").css("color", "red");
                $('#deletePostBtn').html('Delete');
                $('#deletePostBtn').prop('disabled', false);
                return false;
            }
        },
        error: function(){
            $("#error-message2").text("*Error! Please try again.");
            $("#error-message2").css("color","red");
            $('#deletePostBtn').html('Delete');
            $('#deletePostBtn').prop('disabled', false);
        }
    });
    return false;
});