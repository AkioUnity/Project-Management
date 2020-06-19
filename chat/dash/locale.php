<?php
include_once 'header.php';
?>

<h1 class="h3 mb-2 text-gray-800" id="localeTitle">Locales - <?php
    if (isset($_GET['file'])) {
        $fileLocale = $_GET['file'] . '.json';
    } else {
        $fileLocale = 'en_US.json';
    }
    $fileLocale = substr($fileLocale, 0, -5);
    echo $fileLocale;
    ?></h1>
<div id="error" style="display:none;" class="alert alert-danger"></div>
<?php if ($_SESSION["tenant"] == 'lsv_mastertenant' || @$_GET['id'] == $_SESSION["agent"]['agent_id']) { ?>

    <div class="row">
        <div class="col-sm-6">
            <div class="p-1">
                <h6>From this section you make changes to the localizations or add a new ones. </h6>
                <br/>
                <form class="user">

                    <div id="localeStrings"></div>

                    <a href="javascript:void(0);" id="saveLocale" class="btn btn-primary btn-user btn-block">
                        Save
                    </a>
                    <hr>


                </form>

            </div>

        </div>
        <div class="col-sm-6">
            <div class="p-1">
                <h6>Choose a locale from the list below. The default one is en_US and is loaded first. 
                    If you need to add another localization file choose a name and click on the Add button. It will copy the default en_US locale and you can edit it from the form in the left. <br>
                    
                </h6>
                <br/>
                <div class="form-group">
                    <label for="roomName"><h6>Locales</h6></label>
                    <input type="text" class="form-control" id="fileName" aria-describedby="fileName">
                </div>
                <a href="javascript:void(0);" id="addLocale" class="btn btn-primary btn-user btn-block">Add</a>
                <br/>
                <?php
                if ($handle = opendir('../locales')) {
                    echo '<a href="locale.php" class="btn btn-light">en_US</a><hr>';
                    while (false !== ($entry = readdir($handle))) {
                        if ($entry != "." && $entry != ".." && $entry != "en_US.json") {
                            $entry = substr($entry, 0, -5);
                            $delete = '| <a href="deletelocale.php?file=' . $entry . '" id="deleteLocale' . $entry . '" class="btn btn-light">Delete</a>';
                            echo '<a href="locale.php?file=' . $entry . '" class="btn btn-light">' . $entry . '</a>' . $delete . '<hr>';
                        }
                    }

                    closedir($handle);
                }
                ?>

            </div>
        </div>

    </div>

<?php } ?>
<?php
include_once 'footer.php';
