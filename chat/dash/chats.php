<?php
include_once 'header.php';
?>


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Chats</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">

            <table class="table table-bordered" id="chats_table" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th class="text-center">Date</th>
                        <th class="text-center">Room</th>
                        <th class="text-center">Messages</th>
                        <th class="text-center">Agent</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>

            </table>
        </div>

    </div>

</div>
<div id="dialogs">
    <div class="dialog-tmpl">
        <div class="dialog-body"></div>
    </div>
</div>
<?php
include_once 'footer.php';
?>
