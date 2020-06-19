<?php
session_start();

include_once '../server/connect.php';
if (isset($_GET['wplogin']) && isset($_GET['url'])) {
    try {
        $stmt = $pdo->prepare('SELECT * FROM ' . $dbPrefix . 'agents WHERE username = ?');
        $stmt->execute([$_GET['wplogin']]);
        $user = $stmt->fetch();

        if ($user) {
            $_SESSION["tenant"] = ($user['is_master']) ? 'lsv_mastertenant' : $user['tenant'];
            $_SESSION["username"] = $user['username'];
            $actual_link = base64_decode($_GET['url']);
        } else {
            header("Location:loginform.php");
        }
    } catch (Exception $e) {
        return false;
    }
} else {

    $currentPath = $_SERVER['PHP_SELF'];

    $pathInfo = pathinfo($currentPath);
    $hostName = $_SERVER['HTTP_HOST'];

    $actual_link = 'https://' . $hostName . $pathInfo['dirname'] . '/';
    $actual_link = str_replace('dash/', '', $actual_link);
    $basename = $pathInfo['basename'];
}

if (empty($_SESSION["username"])) {
    header("Location:loginform.php");
}
?>
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>PMChat Agent Dashboard</title>

        <!-- Custom fonts for this template-->
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

        <!-- Custom styles for this template-->

        <link href="css/sb-admin-2.min.css" rel="stylesheet">
        <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/agent.css" rel="stylesheet">
        <link rel="stylesheet" href="css/simplechat.css" rel="stylesheet">
        <link rel="stylesheet" href="css/bootstrap-datetimepicker.css" rel="stylesheet">
    </head>

    <body id="page-top">

        <!-- Page Wrapper -->
        <div id="wrapper">

            <!-- Sidebar -->
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <!-- Sidebar - Brand -->
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="dash.php">
                    <img src="img/logo.png">
                </a>

                <!-- Divider -->
                <hr class="sidebar-divider my-0">

                <!-- Nav Item - Dashboard -->
                <li class="nav-item active">
                    <a class="nav-link" href="dash.php">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                <!-- Divider -->
                <hr class="sidebar-divider">
                <?php if ($_SESSION["tenant"] == 'lsv_mastertenant') { ?>
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="agents.php" data-toggle="collapse" data-target="#collapseAgents" aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-fw fa-users-cog"></i>
                            <span>Agents</span>
                        </a>
                        <div id="collapseAgents" class="collapse" aria-labelledby="collapseAgents" data-parent="#accordionSidebar">
                            <div class="bg-white py-2 collapse-inner rounded">
                                <h6 class="collapse-header">Agents:</h6>
                                <a class="collapse-item" href="agents.php">List Agents</a>
                                <a class="collapse-item" href="agent.php">Add New Agent</a>
                            </div>
                        </div>
                    </li>
                <?php } ?>
                <li class="nav-item">
                    <a class="nav-link" href="visitors.php">
                        <i class="fas fa-fw fa-list"></i>
                        <span>Visitors</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link collapsed" href="rooms.php" data-toggle="collapse" data-target="#collapseRooms" aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-fw fa-video"></i>
                        <span>Rooms</span>
                    </a>
                    <div id="collapseRooms" class="collapse" aria-labelledby="collapseRooms" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Rooms:</h6>
                            <a class="collapse-item" href="rooms.php">List Rooms</a>
                            <a class="collapse-item" href="room.php">Room Management</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="chats.php">
                        <i class="fas fa-fw fa-comment-dots"></i>
                        <span>Chat History</span></a>
                </li>
                <?php if ($_SESSION["tenant"] == 'lsv_mastertenant') { ?>
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="users.php" data-toggle="collapse" data-target="#collapseUsers" aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-fw fa-users"></i>
                            <span>Users</span>
                        </a>
                        <div id="collapseUsers" class="collapse" aria-labelledby="collapseUsers" data-parent="#accordionSidebar">
                            <div class="bg-white py-2 collapse-inner rounded">
                                <h6 class="collapse-header">Users:</h6>
                                <a class="collapse-item" href="users.php">List Users</a>
                                <a class="collapse-item" href="user.php">Add New User</a>
                            </div>
                        </div>
                    </li>
                <?php } ?>
                <?php if ($_SESSION["tenant"] == 'lsv_mastertenant') { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="recordings.php">
                            <i class="fas fa-fw fa-compact-disc"></i>
                            <span>Recordings</span></a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="config.php">
                            <i class="fas fa-fw fa-cogs"></i>
                            <span>Configurations</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="locale.php">
                            <i class="fas fa-fw fa-globe"></i>
                            <span>Locales</span></a>
                    </li>
                <?php } ?>


                <!-- Divider -->
                <hr class="sidebar-divider d-none d-md-block">

                <!-- Sidebar Toggler (Sidebar) -->
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

            </ul>
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <h2>PMChat Admin Dashboard</h2>
                        <!-- Topbar Navbar -->
                        <ul class="navbar-nav ml-auto">

                            <div class="topbar-divider d-none d-sm-block"></div>

                            <!-- Nav Item - User Information -->
                            <li class="nav-item dropdown no-arrow">
                                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="mr-2 d-none d-lg-inline text-gray-600"><?php echo @$_SESSION["agent"]["first_name"] . ' ' . @$_SESSION["agent"]["last_name"]; ?></span>
                                    <img class="img-profile rounded-circle" src="img/small-avatar.jpg">
                                </a>
                                <!-- Dropdown - User Information -->
                                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="agent.php?id=<?php echo $_SESSION["agent"]["agent_id"]; ?>">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="logout.php" data-toggle="modal" data-target="#logoutModal">
                                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>

                        </ul>

                    </nav>
                    <!-- End of Topbar -->
                    <div id="statusbar" style="display:none;" class="alert alert-danger"></div>
                    <!-- Begin Page Content -->
                    <div class="container-fluid">
