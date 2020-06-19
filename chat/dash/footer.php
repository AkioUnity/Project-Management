<div id="chats-lsv-admin"></div>
<script>

    var deleteItem = function (itemid, type) {
        if (type === 'room') {
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'deleteroom', 'agentId': agentId, 'roomId': itemid}
            })
                    .done(function (data) {
                        location.reload();
                    })
                    .fail(function () {
                        console.log(false);
                    });
        } else if (type === 'agent') {
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'deleteagent', 'agentId': itemid}
            })
                    .done(function (data) {
                        location.reload();
                    })
                    .fail(function () {
                        console.log(false);
                    });
        } else if (type === 'user') {
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'deleteuser', 'userId': itemid}
            })
                    .done(function (data) {
                        location.reload();
                    })
                    .fail(function () {
                        console.log(false);
                    });
        } else if (type === 'recording') {
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'deleterecording', 'recordingId': itemid}
            })
                    .done(function (data) {
                        location.reload();
                    })
                    .fail(function () {
                        console.log(false);
                    });
        }
    };
    var isAdmin = true;
    var roomId = false;
<?php if ($_SESSION["tenant"] == 'lsv_mastertenant') { ?>
        var agentId = false;
<?php } else { ?>
        var agentId = "<?php echo $_SESSION["tenant"]; ?>";
<?php } ?>
</script>



</div>
<!-- /.container-fluid -->

</div>
<!-- End of Main Content -->

<!-- Footer -->
<footer class="sticky-footer bg-white">
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright &copy; PMChat Video Chat 2019-<?php echo date('Y'); ?></span>
        </div>
    </div>
</footer>
<!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-primary" href="logout.php">Logout</a>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="generateBroadcastLinkModal" tabindex="-1" role="dialog" aria-labelledby="generateBroadcastLinkModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Broadcasting Attendee URL</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Broadcaster URL is opened in a new tab and visitor URL is stored in your clipboard, so you can send to your attendees. <br/> You can copy it from here: <br/> [generateBroadcastLink]</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="generateLinkModal" tabindex="-1" role="dialog" aria-labelledby="generateLinkModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Video Conference Attendee URL</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Agent URL is opened in a new tab and visitor URL is stored in your clipboard, so you can send to your attendees. <br/> You can copy it from here: <br/> [generateLink]</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="js/sb-admin-2.min.js"></script>
<script src="js/detect.js"></script>

<?php if ($basename == 'agent.php') { ?>


    <script>

    <?php
    if (isset($_GET['id'])) {
        ?>
            $('#usernameDiv').hide();
        <?php
    } else {
        ?>
            $('#usernameDiv').show();
        <?php
    }
    ?>
        jQuery(document).ready(function ($) {
            $('#error').hide();
            $('#saveAgent').click(function (event) {
    <?php
    if (isset($_GET['id'])) {
        ?>
                    var dataObj = {'type': 'editagent', 'agentId': <?php echo $_GET['id']; ?>, 'firstName': $('#first_name').val(), 'lastName': $('#last_name').val(), 'tenant': $('#tenant').val(), 'email': $('#email').val(), 'password': $('#password').val(), 'usernamehidden': $('#usernamehidden').val()};
        <?php
    } else {
        ?>
                    var dataObj = {'type': 'addagent', 'username': $('#username').val(), 'firstName': $('#first_name').val(), 'lastName': $('#last_name').val(), 'tenant': $('#tenant').val(), 'email': $('#email').val(), 'password': $('#password').val()};
        <?php
    }
    ?>
                $.ajax({
                    type: 'POST',
                    url: '../server/script.php',
                    data: dataObj
                })
                        .done(function (data) {
                            if (data) {
                                location.href = 'agents.php';
                            } else {
                                $('#error').show();
                                $('#error').html('Error while saving the agent.');
                            }
                        })
                        .fail(function () {
                        });
            });
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getadmin', 'id': <?php echo (int) @$_GET['id'] ?>}
            })
                    .done(function (data) {
                        if (data) {
                            data = JSON.parse(data);
                            $('#agentTitle').html(data.first_name + ' ' + data.last_name);
                            $('#usernamehidden').val(data.username);
                            $('#username').val(data.username);
                            if (data.password) {
                                $('#leftblank').html(' (If left blank will not be changed)');
                            }
                            //$('#password').val(data.password);
                            $('#first_name').val(data.first_name);
                            $('#last_name').val(data.last_name);
                            $('#tenant').val(data.tenant);
                            $('#email').val(data.email);
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
        });</script>

    <?php
}
if ($basename == 'config.php') {
    ?>


    <script>


        jQuery(document).ready(function ($) {
            $('#error').hide();
            $('#saveConfig').click(function (event) {
                var dataObj = {'type': 'updateconfig', 'fileName': '<?php echo $fileConfig; ?>', 'data': {
                        'appWss': $('#appWss').val(),
                        'agentName': $('#agentName').val(),
                        'agentAvatar': $('#agentAvatar').val(),
                        'smartVideoLanguage': $('#smartVideoLanguage').val(),
                        'anonVisitor': $('#anonVisitor').val(),
                        'entryForm.enabled': $('#entryForm_enabled').prop('checked'),
                        'entryForm.required': $('#entryForm_required').prop('checked'),
                        'entryForm.private': $('#entryForm_private').prop('checked'),
                        'entryForm.showEmail': $('#entryForm_showEmail').prop('checked'),
                        'entryForm.showAvatar': $('#entryForm_showAvatar').prop('checked'),
                        'recording.enabled': $('#recording_enabled').prop('checked'),
                        'recording.download': $('#recording_download').prop('checked'),
                        'recording.saveServer': $('#recording_saveServer').prop('checked'),
                        'recording.autoStart': $('#recording_autoStart').prop('checked'),
                        'recording.screen': $('#recording_screen').prop('checked'),
                        'recording.oneWay': $('#recording_oneWay').prop('checked'),
                        'recording.transcode': $('#recording_transcode').prop('checked'),
                        'whiteboard.enabled': $('#whiteboard_enabled').prop('checked'),
                        'whiteboard.allowAnonymous': $('#whiteboard_allowAnonymous').prop('checked'),
                        'videoScreen.greenRoom': $('#videoScreen_greenRoom').prop('checked'),
                        'videoScreen.waitingRoom': $('#videoScreen_waitingRoom').prop('checked'),
                        'videoScreen.videoConference': $('#videoScreen_videoConference').prop('checked'),
                        'videoScreen.onlyAgentButtons': $('#videoScreen_onlyAgentButtons').prop('checked'),
                        'videoScreen.getSnapshot': $('#videoScreen_getSnapshot').prop('checked'),
                        'videoScreen.separateScreenShare': $('#videoScreen_separateScreenShare').prop('checked'),
                        'videoScreen.enableLogs': $('#videoScreen_enableLogs').prop('checked'),
                        'videoScreen.broadcastAttendeeVideo': $('#videoScreen_broadcastAttendeeVideo').prop('checked'),
                        'videoScreen.allowOtherSee': $('#videoScreen_allowOtherSee').prop('checked'),
                        'videoScreen.primaryCamera': $('#videoScreen_primaryCamera').val(),
                        'videoScreen.videoFileStream': $('#videoScreen_videoFileStream').val(),
                        'videoScreen.videoConstraint': ($('#videoScreen_videoConstraint').val()) ? JSON.parse($('#videoScreen_videoConstraint').val()) : '',
                        'videoScreen.audioConstraint': ($('#videoScreen_audioConstraint').val()) ? JSON.parse($('#videoScreen_audioConstraint').val()) : '',
                        'videoScreen.screenConstraint': ($('#videoScreen_screenConstraint').val()) ? JSON.parse($('#videoScreen_screenConstraint').val()) : '',
                        'serverSide.loginForm': $('#serverSide_loginForm').prop('checked'),
                        'serverSide.chatHistory': $('#serverSide_chatHistory').prop('checked'),
                        'serverSide.feedback': $('#serverSide_feedback').prop('checked'),
                        'iceServers.iceServers': ($('#iceServers').val()) ? JSON.parse($('#iceServers').val()) : '',
                        'iceServers.requirePass': $('#iceServers_requirePass').prop('checked'),
                        'transcribe.languageTo': $('#transcribe_languageTo').val(),
                        'transcribe.language': $('#transcribe_language').val(),
                        'transcribe.direction': $('#transcribe_direction').val(),
                        'transcribe.apiKey': $('#transcribe_apiKey').val(),
                        'transcribe.enabled': $('#transcribe_enabled').prop('checked')
                    }};
                $.ajax({
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    url: '../server/script.php',
                    data: dataObj
                })
                        .done(function (data) {
                            if (data) {
                                location.href = 'config.php?file=<?php echo $fileConfig; ?>';
                            } else {
                                $('#error').show();
                                $('#error').html('Error while saving the config file.');
                            }
                        })
                        .fail(function (e) {
                            console.log(e);
                        });
            });
            $('#addConfig').click(function (event) {
                var dataObj = {'type': 'addconfig', 'fileName': $('#fileName').val()};
                $.ajax({
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    url: '../server/script.php',
                    data: dataObj
                })
                        .done(function (data) {
                            if (data) {
                                location.href = 'config.php?file=' + $('#fileName').val();
                            } else {
                                $('#error').show();
                                $('#error').html('Error while adding the config file.');
                            }
                        })
                        .fail(function (e) {
                            console.log(e);
                        });
            });
    <?php
    $jsonString = file_get_contents('../config/' . $fileConfig . '.json');
    $data = json_decode($jsonString);
    ?>

            $('#appWss').val('<?php echo @$data->appWss; ?>');
            $('#agentName').val('<?php echo @$data->agentName; ?>');
            $('#agentAvatar').val('<?php echo @$data->agentAvatar; ?>');
            $('#smartVideoLanguage').val('<?php echo @$data->smartVideoLanguage; ?>');
            $('#anonVisitor').val('<?php echo @$data->anonVisitor; ?>');
            $('#entryForm_enabled').prop('checked', <?php echo @$data->entryForm->enabled; ?>);
            $('#entryForm_required').prop('checked', <?php echo @$data->entryForm->required; ?>);
            $('#entryForm_private').prop('checked', <?php echo @$data->entryForm->private; ?>);
            $('#entryForm_showEmail').prop('checked', <?php echo @$data->entryForm->showEmail; ?>);
            $('#entryForm_showAvatar').prop('checked', <?php echo @$data->entryForm->showAvatar; ?>);
            $('#recording_enabled').prop('checked', <?php echo @$data->recording->enabled; ?>);
            $('#recording_download').prop('checked', <?php echo @$data->recording->download; ?>);
            $('#recording_saveServer').prop('checked', <?php echo @$data->recording->saveServer; ?>);
            $('#recording_autoStart').prop('checked', <?php echo @$data->recording->autoStart; ?>);
            $('#recording_screen').prop('checked', <?php echo @$data->recording->screen; ?>);
            $('#recording_oneWay').prop('checked', <?php echo @$data->recording->oneWay; ?>);
            $('#recording_transcode').prop('checked', <?php echo @$data->recording->transcode; ?>);
            $('#whiteboard_enabled').prop('checked', <?php echo @$data->whiteboard->enabled; ?>);
            $('#whiteboard_allowAnonymous').prop('checked', <?php echo @$data->whiteboard->allowAnonymous; ?>);
            $('#videoScreen_greenRoom').prop('checked', <?php echo @$data->videoScreen->greenRoom; ?>);
            $('#videoScreen_waitingRoom').prop('checked', <?php echo @$data->videoScreen->waitingRoom; ?>);
            $('#videoScreen_videoConference').prop('checked', <?php echo @$data->videoScreen->videoConference; ?>);
            $('#videoScreen_onlyAgentButtons').prop('checked', <?php echo @$data->videoScreen->onlyAgentButtons; ?>);
            $('#videoScreen_getSnapshot').prop('checked', <?php echo @$data->videoScreen->getSnapshot; ?>);
            $('#videoScreen_separateScreenShare').prop('checked', <?php echo @$data->videoScreen->separateScreenShare; ?>);
            $('#videoScreen_broadcastAttendeeVideo').prop('checked', <?php echo @$data->videoScreen->broadcastAttendeeVideo; ?>);
            $('#videoScreen_allowOtherSee').prop('checked', <?php echo @$data->videoScreen->allowOtherSee; ?>);
            $('#videoScreen_primaryCamera').val('<?php echo @$data->videoScreen->primaryCamera; ?>');
            $('#videoScreen_videoFileStream').val('<?php echo @$data->videoScreen->videoFileStream; ?>');
            $('#videoScreen_videoConstraint').val('<?php echo (isset($data->videoScreen->videoConstraint)) ? json_encode($data->videoScreen->videoConstraint, JSON_FORCE_OBJECT) : ''; ?>');
            $('#videoScreen_audioConstraint').val('<?php echo (isset($data->videoScreen->audioConstraint)) ? json_encode($data->videoScreen->audioConstraint, JSON_FORCE_OBJECT) : ''; ?>');
            $('#videoScreen_screenConstraint').val('<?php echo (isset($data->videoScreen->screenConstraint)) ? json_encode($data->videoScreen->screenConstraint, JSON_FORCE_OBJECT) : ''; ?>');
            $('#serverSide_loginForm').prop('checked', <?php echo @$data->serverSide->loginForm; ?>);
            $('#serverSide_chatHistory').prop('checked', <?php echo @$data->serverSide->chatHistory; ?>);
            $('#serverSide_feedback').prop('checked', <?php echo @$data->serverSide->feedback; ?>);
            $('#iceServers').val('<?php echo (isset($data->iceServers->iceServers)) ? json_encode($data->iceServers->iceServers) : ''; ?>')
            $('#iceServers_requirePass').prop('checked', <?php echo @$data->iceServers->requirePass; ?>);
            $('#videoScreen_enableLogs').prop('checked', <?php echo @$data->videoScreen->enableLogs; ?>);
            $('#transcribe_enabled').prop('checked', <?php echo @$data->transcribe->enabled; ?>);
            $('#transcribe_language').val('<?php echo @$data->transcribe->language; ?>');
            $('#transcribe_languageTo').val('<?php echo @$data->transcribe->languageTo; ?>');
            $('#transcribe_direction').val('<?php echo @$data->transcribe->direction; ?>');
            $('#transcribe_apiKey').val('<?php echo @$data->transcribe->apiKey; ?>');
        });</script>

    <?php
}
if ($basename == 'locale.php') {
    ?>


    <script>

    <?php
    $jsonString = file_get_contents('../locales/' . $fileLocale . '.json');

    $data = json_decode($jsonString, true);
    $fileContent = '';
    $fileData = '';
    foreach ($data as $key => $value) {
        $fileContent .= '<div class="form-group"><label for="roomName"><h6>' . $key . ':</h6></label><input type="text" class="form-control" id="' . $key . '" aria-describedby="' . $key . '" value="' . htmlentities(addslashes($value)) . '"></div>';
        $fileData .= "'" . $key . "': $('#" . $key . "').val(),";
    };
    $fileData = substr($fileData, 0, -1);
    ?>
        jQuery(document).ready(function ($) {
            $('#error').hide();
            $('#saveLocale').click(function (event) {
                var dataObj = {'type': 'updatelocale', 'fileName': '<?php echo $fileLocale; ?>', 'data': {<?php echo $fileData;?>}};
                $.ajax({
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    url: '../server/script.php',
                    data: dataObj
                })
                        .done(function (data) {
                            if (data) {
                                location.href = 'locale.php?file=<?php echo $fileLocale; ?>';
                            } else {
                                $('#error').show();
                                $('#error').html('Error while saving the config file.');
                            }
                        })
                        .fail(function (e) {
                            console.log(e);
                        });
            });
            $('#addLocale').click(function (event) {
                var dataObj = {'type': 'addlocale', 'fileName': $('#fileName').val()};
                $.ajax({
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    url: '../server/script.php',
                    data: dataObj
                })
                        .done(function (data) {
                            if (data) {
                                location.href = 'locale.php?file=' + $('#fileName').val();
                            } else {
                                $('#error').show();
                                $('#error').html('Error while adding the locale file.');
                            }
                        })
                        .fail(function (e) {
                            console.log(e);
                        });
            });

            $('#localeStrings').html('<?php echo $fileContent; ?>');
        });</script>

    <?php
}
if ($basename == 'user.php') {
    ?>


    <script>


        jQuery(document).ready(function ($) {
            $('#error').hide();
            $('#saveUser').click(function (event) {
                var isBlocked = ($('#is_blocked').prop('checked')) ? 1 : 0;
    <?php
    if (isset($_GET['id'])) {
        ?>
                    var name = $('#first_name').val() + ' ' + $('#last_name').val();
                    var dataObj = {'type': 'edituser', 'userId': <?php echo $_GET['id']; ?>, 'name': name, 'firstName': $('#first_name').val(), 'lastName': $('#last_name').val(), 'username': $('#email').val(), 'password': $('#password').val(), 'isBlocked': isBlocked};
        <?php
    } else {
        ?>
                    var dataObj = {'type': 'adduser', 'username': $('#email').val(), 'firstName': $('#first_name').val(), 'lastName': $('#last_name').val(), 'name': $('#first_name').val() + ' ' + $('#last_name').val(), 'password': $('#password').val(), 'isBlocked': isBlocked};
        <?php
    }
    ?>
                $.ajax({
                    type: 'POST',
                    url: '../server/script.php',
                    data: dataObj
                })
                        .done(function (data) {
                            if (data) {
                                location.href = 'users.php';
                            } else {
                                $('#error').show();
                                $('#error').html('Error while saving the user.');
                            }
                        })
                        .fail(function () {
                        });
            });
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getuser', 'id': <?php echo (int) @$_GET['id'] ?>}
            })
                    .done(function (data) {
                        if (data) {
                            data = JSON.parse(data);
                            $('#userTitle').html(data.name);
                            $('#username').val(data.username);
                            if (data.password) {
                                $('#leftblank').html(' (If left blank will not be changed)');
                            }
                            //$('#password').val(data.password);
                            if (!data.first_name && !data.last_name) {
                                var name = data.name.split(' ');
                                data.first_name = name[0];
                                data.last_name = name[1];
                            }
                            $('#first_name').val(data.first_name);
                            $('#last_name').val(data.last_name);
                            $('#email').val(data.username);
                            $('#is_blocked').prop('checked', (data.is_blocked == 1));
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
        });</script>

    <?php
}
if ($basename == 'agents.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {

            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getagents'}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $.each(result, function (i, item) {

                                if (item.is_master == 1) {
                                    var deleteEditLink = '<a href="agent.php?id=' + item.agent_id + '">Edit</a>';
                                } else {
                                    deleteEditLink = '<a href="agent.php?id=' + item.agent_id + '">Edit</a> | <a href="javascript:void(0);" id="deleteagent' + item.agent_id + '">Delete</a>';
                                }
                                $('<tr>').append(
                                        $('<td>').text(item.username),
                                        $('<td>').text(item.first_name + ' ' + item.last_name),
                                        $('<td>').text(item.tenant),
                                        $('<td>').text(item.email),
                                        $('<td>').html(deleteEditLink)
                                        ).appendTo('#agents_table');
                                $('#deleteagent' + item.agent_id).on('click', function () {
                                    deleteItem(item.agent_id, 'agent');
                                });
                            });
                            $('#agents_table').DataTable();
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
        });</script>

    <?php
}
if ($basename == 'users.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {

            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getusers'}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $.each(result, function (i, item) {
                                var yesNo = (item.is_blocked) ? 'Yes' : 'No';
                                var deleteEditLink = '<a href="user.php?id=' + item.user_id + '">Edit</a> | <a href="javascript:void(0);" id="deleteuser' + item.user_id + '">Delete</a>';
                                $('<tr>').append(
                                        $('<td>').text(item.name),
                                        $('<td>').text(item.username),
                                        $('<td>').text(yesNo),
                                        $('<td>').html(deleteEditLink)
                                        ).appendTo('#users_table');
                                $('#deleteuser' + item.user_id).on('click', function () {
                                    deleteItem(item.user_id, 'user');
                                });
                            });
                            $('#users_table').DataTable();
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
        });</script>

    <?php
}
if ($basename == 'recordings.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {

            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getrecordings'}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $.each(result, function (i, item) {
                                var deleteEditLink = '<a href="../server/recordings/' + item.filename + '" target="_blank">View</a> | <a href="javascript:void(0);" id="deleterecording' + item.recording_id + '">Delete</a>';
                                $('<tr>').append(
                                        $('<td>').html('<a href="../server/recordings/' + item.filename + '" target="_blank">' + item.filename + '</a>'),
                                        $('<td>').text(item.room_id),
                                        $('<td>').text(item.agent_id),
                                        $('<td>').text(item.date_created),
                                        $('<td>').html(deleteEditLink)
                                        ).appendTo('#recordings_table');
                                $('#deleterecording' + item.recording_id).on('click', function () {
                                    deleteItem(item.recording_id, 'recording');
                                });
                            });
                            $('#recordings_table').DataTable({
                                "order": [[3, 'desc']],
                            });
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
        });</script>

    <?php
}
if ($basename == 'rooms.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {

            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getrooms', 'agentId': agentId}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            var getCurrentDateFormatted = function (date) {
                                var currentdate = new Date(date);
                                if (currentdate.getDate()) {
                                    return ('0' + currentdate.getDate()).slice(-2) + "/"
                                            + ('0' + (currentdate.getMonth() + 1)).slice(-2) + "/"
                                            + currentdate.getFullYear() + " "
                                            + ('0' + currentdate.getHours()).slice(-2) + '.' + ('0' + currentdate.getMinutes()).slice(-2);
                                } else {
                                    return '';
                                }
                            };
                            $.each(result, function (i, item) {
                                var datetimest = '';
                                if (item.datetime) {
                                    datetimest = getCurrentDateFormatted(item.datetime) + ' / ' + item.duration;
                                }
                                $('<tr>').append(
                                        $('<td id="roomid_' + item.roomId + '">').text(item.roomId),
                                        $('<td>').text(item.agent),
                                        $('<td>').text(item.visitor),
                                        $('<td>').html('<a target="_blank" title="Conference agent URL" href="' + item.agenturl + '"><?php echo $actual_link; ?>' + item.shortagenturl + '</a><br/><a title="Broadcast agent URL" target="_blank" href="' + item.agenturl_broadcast + '"><?php echo $actual_link; ?>' + item.shortagenturl_broadcast + '</a>'),
                                        $('<td>').html('<a target="_blank" title="Conference visitor URL" href="' + item.visitorurl + '"><?php echo $actual_link; ?>' + item.shortvisitorurl + '</a><br/><a title="Broadcast visitor URL" target="_blank" href="' + item.visitorurl_broadcast + '"><?php echo $actual_link; ?>' + item.shortvisitorurl_broadcast + '</a>'),
                                        $('<td>').text(datetimest),
                                        $('<td>').html('<a href="room.php?id=' + item.room_id + '">Edit</a> | <a href="javacript:void(0);" id="deleteroom' + item.room_id + '">Delete</a>')
                                        ).appendTo('#rooms_table');
                                $('#deleteroom' + item.room_id).on('click', function () {
                                    deleteItem(item.room_id, 'room');
                                });
                            });
                            $('#rooms_table').DataTable();
                        }
                    })
                    .fail(function () {
                        console.log(false);
                    });
        });</script>

    <?php
}
if ($basename == 'visitors.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {
            setTimeout(function () {
                svConfigs.agentName = '<?php echo @$_SESSION["agent"]["first_name"] . ' ' . @$_SESSION["agent"]["last_name"]; ?>';
            }, 3000);
        });</script>

    <?php
}
if ($basename == 'chats.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {

            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getchats', 'agentId': agentId}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $.each(result, function (i, item) {
                                var openModal = '<div class="modal fade" id="ex' + item.room_id + '" tabindex="-1" role="dialog" aria-labelledby="ex' + item.room_id + '" aria-hidden="true"><div class="modal-dialog modal-lgr" role="document"><button type="button" data-toggle="modal" class="closeDocumentModal" data-target="#ex' + item.room_id + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="fa fa-times"></span></button><div class="modal-content">' + item.messages + '</div>     </div> </div><a href="" class="btn fa fa-comments" data-toggle="modal" data-target="#ex' + item.room_id + '"></a>';
                                $('<tr>').append(
                                        $('<td>').text(item.date_created),
                                        $('<td>').text(item.room_id),
                                        $('<td>').html(openModal),
                                        $('<td>').text(item.agent),
                                        ).appendTo('#chats_table');
                            });
                            $('#chats_table').DataTable({
                                "pagingType": "full_numbers",
                                "order": [[0, 'desc']],
                            });
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
        });</script>

    <?php
}
if ($basename == 'dash.php') {
    ?>
    <script>

        jQuery(document).ready(function ($) {

            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getrooms', 'agentId': agentId}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $('#roomsCount').html(result.length);
                        }
                    })
                    .fail(function () {
                        console.log(false);
                    });
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getagents', 'agentId': agentId}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $('#agentsCount').html(result.length);
                        }
                    })
                    .fail(function () {
                        console.log(false);
                    });
            $.ajax({
                type: 'POST',
                url: '../server/script.php',
                data: {'type': 'getusers', 'agentId': agentId}
            })
                    .done(function (data) {
                        if (data) {
                            var result = JSON.parse(data);
                            $('#usersCount').html(result.length);
                        }
                    })
                    .fail(function () {
                        console.log(false);
                    });
            $.ajaxSetup({cache: false});
            $.getJSON('https://www.new-dev.com/version/version.json', function (data) {
                if (data) {
                    var currentVersion = '<?php echo $currentVersion; ?>';
                    var newNumber = data.version.split('.');
                    var curNumber = currentVersion.split('.');
                    var isNew = false;
                    if (parseInt(curNumber[0]) < parseInt(newNumber[0])) {
                        isNew = true;
                    }
                    if (parseInt(curNumber[0]) == parseInt(newNumber[0]) && parseInt(curNumber[1]) < parseInt(newNumber[1])) {
                        isNew = true;
                    }
                    if (parseInt(curNumber[0]) == parseInt(newNumber[0]) && parseInt(curNumber[1]) == parseInt(newNumber[1]) && parseInt(curNumber[2]) < parseInt(newNumber[2])) {
                        isNew = true;
                    }

                    if (isNew) {

                        $('#remoteVersion').html('There is a new version of PMChat Video Chat: ' + data.version + '<br/><br/>New features: <br/>' + data.text);
                    } else {
                        $('#remoteVersion').html('Your version is up-to-date.');
                    }

                } else {
                    $('#remoteVersion').html('Cannot connect to PMChat!');
                }
            });
        });</script>

    <?php
}
if ($basename == 'room.php') {
    ?><script>
    <?php
    if (isset($_GET['id'])) {
        ?>

                var queryStr = function (url) {
                    // This function is anonymous, is executed immediately and
                    // the return value is assigned to QueryString!
                    var query_string = {};
                    var query = url.substring(1);
                    var vars = query.split("&");
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split("=");
                        if (typeof query_string[pair[0]] === "undefined") {
                            query_string[pair[0]] = pair[1];
                        } else if (typeof query_string[pair[0]] === "string") {
                            var arr = [query_string[pair[0]], pair[1]];
                            query_string[pair[0]] = arr;
                        } else {
                            query_string[pair[0]].push(pair[1]);
                        }
                    }
                    return query_string;
                };
                $.ajax({
                    type: 'POST',
                    url: '../server/script.php',
                    data: {'type': 'getroom', 'room_id': <?php echo (int) @$_GET['id'] ?>}
                })
                        .done(function (data) {
                            if (data) {
                                data = JSON.parse(data);
                                var parsed = {};
                                if (data.visitorurl) {
                                    var visitorUrl = data.visitorurl;
                                    var parser = document.createElement('a');
                                    parser.href = visitorUrl;
                                    parsed = JSON.parse(decodeURIComponent(escape(window.atob(queryStr(parser.search).p))));
                                }
                                $('#roomName').val(data.roomId);
                                $('#names').val(data.agent);
                                $('#visitorName').val(parsed.visitorName);
                                $('#shortagent').val(data.shortagenturl);
                                $('#shortvisitor').val(data.shortvisitorurl);
                                $('#config').val(parsed.config);
                                if (data.datetime) {
                                    let current_datetime = new Date(data.datetime);
                                    var formatted_date = (current_datetime.getMonth() + 1) + '/' + current_datetime.getDate() + '/' + current_datetime.getFullYear() + ' ' + current_datetime.getHours() + ':' + current_datetime.getMinutes();
                                    $('#datetime').val(formatted_date);
                                }

                                $('#duration').val(data.duration);
                                if (parsed.disableVideo) {
                                    $('#disableVideo').prop('checked', true);
                                }
                                if (parsed.disableAudio) {
                                    $('#disableAudio').prop('checked', true);
                                }
                                if (parsed.disableScreenShare) {
                                    $('#disableScreenShare').prop('checked', true);
                                }
                                if (parsed.disableWhiteboard) {
                                    $('#disableWhiteboard').prop('checked', true);
                                }
                                if (parsed.disableTransfer) {
                                    $('#disableTransfer').prop('checked', true);
                                }
                                if (parsed.autoAcceptVideo) {
                                    $('#autoAcceptVideo').prop('checked', true);
                                }
                                if (parsed.autoAcceptAudio) {
                                    $('#autoAcceptAudio').prop('checked', true);
                                }

                            }
                        })
                        .fail(function (e) {
                            console.log(e);
                        });
        <?php
    }
    ?>



            var agentUrl, visitorUrl, sessionId, shortAgentUrl, shortVisitorUrl, agentBroadcastUrl, viewerBroadcastLink, shortAgentUrl_broadcast, shortVisitorUrl_broadcast;
            jQuery(document).ready(function ($) {
                $('#error').hide();
                $('#saveRoom').on('click', function () {
                    generateLink();
                    var datetime = ($('#datetime').val()) ? new Date($('#datetime').val()).toISOString() : '';
    <?php
    if (isset($_GET['id'])) {
        ?>
                        var dataObj = {'room_id': '<?php echo $_GET['id']; ?>', 'type': 'editroom', 'agentId': agentId, 'agent': $('#names').val(), 'agenturl': agentUrl, 'visitor': $('#visitorName').val(), 'visitorurl': visitorUrl,
                            'password': $('#roomPass').val(), 'session': sessionId, 'datetime': datetime, 'duration': $('#duration').val(), 'shortVisitorUrl': shortVisitorUrl, 'shortAgentUrl': shortAgentUrl,
                            'agenturl_broadcast': agentBroadcastUrl, 'visitorurl_broadcast': viewerBroadcastLink, 'shortVisitorUrl_broadcast': shortVisitorUrl_broadcast, 'shortAgentUrl_broadcast': shortAgentUrl_broadcast};
        <?php
    } else {
        ?>
                        var dataObj = {'type': 'scheduling', 'agentId': agentId, 'agent': $('#names').val(), 'agenturl': agentUrl, 'visitor': $('#visitorName').val(), 'visitorurl': visitorUrl,
                            'password': $('#roomPass').val(), 'session': sessionId, 'datetime': datetime, 'duration': $('#duration').val(), 'shortVisitorUrl': shortVisitorUrl, 'shortAgentUrl': shortAgentUrl,
                            'agenturl_broadcast': agentBroadcastUrl, 'visitorurl_broadcast': viewerBroadcastLink, 'shortVisitorUrl_broadcast': shortVisitorUrl_broadcast, 'shortAgentUrl_broadcast': shortAgentUrl_broadcast};
        <?php
    }
    ?>
                    $.ajax({
                        type: 'POST',
                        url: '../server/script.php',
                        data: dataObj
                    })
                            .done(function (data) {
                                if (data == 200) {
                                    location.href = 'rooms.php';
                                } else {
                                    $('#error').show();
                                    $('#error').html('Error while saving the room.');
                                }
                            })
                            .fail(function () {
                                $('#error').show();
                                $('#error').html('Error while saving the room.');
                            });
                });
                $('#generateLink').on('click', function () {
                    generateLink(false);
                    window.open(agentUrl);
                    var text = $('#generateLinkModal').html();
                    $('#generateLinkModal').html(text.replace('[generateLink]', visitorUrl));
                    $('#generateLinkModal').modal('toggle');
                });
                $('#generateBroadcastLink').on('click', function () {
                    generateLink(true);
                    window.open(agentUrl);
                    var text = $('#generateBroadcastLinkModal').html();
                    $('#generateBroadcastLinkModal').html(text.replace('[generateBroadcastLink]', viewerBroadcastLink));
                    $('#generateBroadcastLinkModal').modal('toggle');
                });
                var d = new Date();
                //            $('#datetime').datetimepicker({
                //                timeFormat: 'h:mm TT',
                //                stepHour: 1,
                //    //                        stepMinute: 15,
                //                controlType: 'select',
                //                hourMin: 8,
                //                hourMax: 21,
                //                minDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 0),
                //                oneLine: true
                //            });
                $('#datetime').datetimepicker({

                    format: 'MM/DD/YYYY HH:mm',
                    minDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 0),
                    icons: {
                        time: 'fa fa-clock',
                        date: 'fa fa-calendar',
                        up: 'fa fa-chevron-up',
                        down: 'fa fa-chevron-down',
                        previous: 'fa fa-chevron-left',
                        next: 'fa fa-chevron-right',
                        today: 'fa fa-check',
                        clear: 'fa fa-trash',
                        close: 'fa fa-times'
                    }
                });
            });</script>

<?php } ?>
<script src="vendor/datatables/jquery.dataTables.min.js"></script>
<script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
<script src="js/moment.min.js"></script>
<script src="js/bootstrap-datetimepicker.js"></script>
<script src="<?php echo $actual_link; ?>js/loader.v2.js" data-source_path="<?php echo $actual_link; ?>" ></script>
</body>

</html>