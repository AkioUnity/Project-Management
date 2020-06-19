<?php
include_once 'header.php';
?>

<?php if ($_SESSION["tenant"] == 'lsv_mastertenant') { ?>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary float-left">Users</h6>
            <div class="float-right"><a href="user.php" class=""><i class="fas fa-plus fa-2x text-300"></i></a></div>
        </div>
        <div class="card-body">
            <div class="table-responsive">

                <table class="table table-bordered" id="users_table" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="text-center">Name</th>
                            <th class="text-center">Username</th>
                            <th class="text-center">Blocked</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </table>
            </div>

        </div>

    </div>
<?php } ?>

<?php
include_once 'footer.php';
?>
