<?php
include_once 'header.php';
?>

<h1 class="h3 mb-2 text-gray-800" id="agentTitle">Agent</h1>
<div id="error" style="display:none;" class="alert alert-danger"></div>
<?php if ($_SESSION["tenant"] == 'lsv_mastertenant' || @$_GET['id'] == $_SESSION["agent"]['agent_id']) { ?>

    <div class="row">
        <div class="col-lg-5">
            <div class="p-1">

                <form class="user">

                    <div class="form-group">
                        <label for="first_name"><h6>First Name:</h6></label>
                        <input type="text" class="form-control" id="first_name" aria-describedby="first_name">
                    </div>
                    <div class="form-group">
                        <label for="last_name"><h6>Last Name:</h6></label>
                        <input type="text" class="form-control" id="last_name" aria-describedby="last_name">
                    </div>
                    <?php if ($_SESSION["tenant"] == 'lsv_mastertenant') { ?>
                        <div class="form-group">
                            <label for="email"><h6>Email:</h6></label>
                            <input type="text" class="form-control" id="email" aria-describedby="email">
                        </div>
                        <div class="form-group">
                            <label for="tenant"><h6>Tenant:</h6></label>
                            <input type="text" class="form-control" id="tenant" aria-describedby="tenant">
                        </div>
                        <div class="form-group" id="usernameDiv">
                            <label for="first_name"><h6>Username:</h6></label>
                            <input type="text" class="form-control" id="username" aria-describedby="username">
                        </div>
                        <div class="form-group">
                            <label for="last_name"><h6>Password <span id="leftblank"></span>:</h6></label>
                            <input type="password" class="form-control" id="password" autocomplete="new-password">
                        </div>
                    <?php } ?>
                    <input type="hidden" class="form-control" id="usernamehidden">
                    <a href="javascript:void(0);" id="saveAgent" class="btn btn-primary btn-user btn-block">
                        Save
                    </a>
                    <hr>

                </form>

            </div>
        </div>
    </div>
<?php } ?>
<?php
include_once 'footer.php';
