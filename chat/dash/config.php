<?php
include_once 'header.php';
?>

<h1 class="h3 mb-2 text-gray-800" id="configTitle">Configurations - <?php
    if (isset($_GET['file'])) {
        $fileConfig = $_GET['file'] . '.json';
    } else {
        $fileConfig = 'config.json';
    }
    $fileConfig = substr($fileConfig, 0, -5);
    echo $fileConfig;
    ?></h1>
<div id="error" style="display:none;" class="alert alert-danger"></div>
<?php if ($_SESSION["tenant"] == 'lsv_mastertenant' || @$_GET['id'] == $_SESSION["agent"]['agent_id']) { ?>

    <div class="row">
        <div class="col-sm-6">
            <div class="p-1">
                <h6>From this section you make changes to the configuration options of your video sessions. Please be careful when changing the options and make sure you have read <a href="https://www.new-dev.com/page/ident/live_smart_video_chat_installation#configfile" target="_blank">here</a> their meanings</h6>
                <br/>
                <form class="user">

                    <div class="form-group">
                        <label for="roomName"><h6>Server URL <small>(needs to be like this https://domain_name:900/)</small>:</h6></label>
                        <input type="text" class="form-control" id="appWss" aria-describedby="appWss">
                    </div>
                    <div class="form-group">
                        <label for="roomName"><h6>Agent Name <small>(if specified, it will appear in your visitor video and chat panes)</small>:</h6></label>
                        <input type="text" class="form-control" id="agentName" aria-describedby="agentName">
                    </div>
                    <div class="form-group">
                        <label for="names"><h6>Language locale <small>(you need to have the same locale files in /locales folder)</small>:</h6></label>
                        <select class="form-control" name="smartVideoLanguage" id="smartVideoLanguage">
                            <?php
                            if ($handle = opendir('../locales')) {

                                while (false !== ($entry = readdir($handle))) {
                                    
                                    if ($entry != "." && $entry != "..") {
                                        $entry = substr($entry, 0, -5);
                                        echo '<option value="' . $entry . '">' . $entry . '</option>';
                                    }
                                }

                                closedir($handle);
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="names"><h6>Anonymous user <small>(how the anonymous user appears)</small>:</h6></label>
                        <input type="text" class="form-control" id="anonVisitor" aria-describedby="anonVisitor">
                    </div>
                    <div class="form-group">
                        <h6>Entry Form</h6>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="entryForm_enabled">
                            <label class="custom-control-label" for="entryForm_enabled">Enabled</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="entryForm_required">
                            <label class="custom-control-label" for="entryForm_required">Required</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="entryForm_private">
                            <label class="custom-control-label" for="entryForm_private">Private (enable only if you have specified user credentials or using password field for a room)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="entryForm_showEmail">
                            <label class="custom-control-label" for="entryForm_showEmail">Show Email (enable only if you have specified user credentials or using password field for a room)</label>
                        </div>

                    </div>
                    <div class="form-group">
                        <h6>Recordings</h6>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_enabled">
                            <label class="custom-control-label" for="recording_enabled">Enabled</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_download">
                            <label class="custom-control-label" for="recording_download">Download (recorded file is directly downloaded after video session is finished)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_saveServer">
                            <label class="custom-control-label" for="recording_saveServer">Save on server (recorded file is saved into /server/recordings folder)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_autoStart">
                            <label class="custom-control-label" for="recording_autoStart">Auto start (recording is started on video session starts)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_screen">
                            <label class="custom-control-label" for="recording_screen">Save whole screen (starts a screenshare stream and will use it as a recording)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_oneWay">
                            <label class="custom-control-label" for="recording_oneWay">One way (only visitor stream will be recorded)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="recording_transcode">
                            <label class="custom-control-label" for="recording_transcode">Transcode (check <a href="https://www.new-dev.com/page/ident/live_smart_video_chat_installation#configfile" target="_blank">here</a> how to enable this option)</label>
                        </div>


                    </div>
                    <div class="form-group">
                        <h6>Whiteboard</h6>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="whiteboard_enabled">
                            <label class="custom-control-label" for="whiteboard_enabled">Enabled</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="whiteboard_allowAnonymous">
                            <label class="custom-control-label" for="whiteboard_allowAnonymous">Allow Anonymous (visitors are also allowed to draw on the whiteboard)</label>
                        </div>

                    </div>
                    <div class="form-group">
                        <h6>Video Panel</h6>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_greenRoom">
                            <label class="custom-control-label" for="videoScreen_greenRoom">Green room (pre-meeting room, where you can check your video and audio preferences)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_videoConference">
                            <label class="custom-control-label" for="videoScreen_videoConference">Conference style of video panes (it is checked by default. If not checked, only organizer of the meeting will be present in the big video pane)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_onlyAgentButtons">
                            <label class="custom-control-label" for="videoScreen_onlyAgentButtons">Only agent enabled buttons</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_getSnapshot">
                            <label class="custom-control-label" for="videoScreen_getSnapshot">Snapshot</label>
                        </div>                    
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_separateScreenShare">
                            <label class="custom-control-label" for="videoScreen_separateScreenShare">Screen share is on separate stream (screen share session is replacing the video stream. If checked, screenshare and video will be on different streams. This may cause network outage and delay)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_broadcastAttendeeVideo">
                            <label class="custom-control-label" for="videoScreen_broadcastAttendeeVideo">Attendee in a broadcast can join with video, not only audio</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_allowOtherSee">
                            <label class="custom-control-label" for="videoScreen_allowOtherSee">Other attendees in broadcasting will see/hear the speaking attendee, not only the organizer</label>
                        </div>
                        <div class="custom-control">
                            <label for="videoScreen_videoFileStream">Video URL. If set, the broadcasting will stream from this file. Accepted format: mp4, webm, mov, ogg:</label>
                            <input type="text" class="form-control" id="videoScreen_videoFileStream" aria-describedby="videoScreen_videoFileStream">
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_waitingRoom">
                            <label class="custom-control-label" for="videoScreen_waitingRoom">System messages are shown in video panel, not in the chat</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="videoScreen_enableLogs">
                            <label class="custom-control-label" for="videoScreen_enableLogs">Enable logs (enable only for debugging. Not recommended)</label>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="videoScreen_primaryCamera">Primary camera for mobile:</label>
                            <select class="form-control" name="videoScreen_primaryCamera" id="videoScreen_primaryCamera"><option value="user">Front</option><option value="environment">Back</option></select>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="videoScreen_videoConstraint">Video Constraints. For more information about the constraints check <a href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints" target="_blank">here</a>. If you expect meeting with more participants, you can lower your camera resolution like this <pre>{"width": {"max": 424}, "height": {"max": 240}}</pre></label>
                            <textarea class="form-control" id="videoScreen_videoConstraint"></textarea>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="videoScreen_audioConstraint">Audio Constraints:</label>
                            <textarea class="form-control" id="videoScreen_audioConstraint"></textarea>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="videoScreen_screenConstraint">Screen Constraints:</label>
                            <textarea class="form-control" id="videoScreen_screenConstraint"></textarea>
                        </div>

                    </div>

                    <div class="form-group">
                        <h6>Server side</h6>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="serverSide_loginForm">
                            <label class="custom-control-label" for="serverSide_loginForm">Login form (enable only if you have specified user credentials from the Users section, together with the Entry form)</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="serverSide_chatHistory">
                            <label class="custom-control-label" for="serverSide_chatHistory">Chat history</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="serverSide_feedback">
                            <label class="custom-control-label" for="serverSide_feedback">Feedback form</label>
                        </div>

                    </div>
                    
                    <div class="form-group">
                        <h6>Speech to text and translate</h6>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="transcribe_enabled">
                            <label class="custom-control-label" for="transcribe_enabled">Enabled</label>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="transcribe_enabled">Language:</label>
                            <select class="form-control" name="transcribe_language" id="transcribe_language"><option value="af">Afrikaans (af)</option><option value="sq">Albanian (sq)</option><option value="am">Amharic (am)</option><option value="ar">Arabic (ar)</option><option value="hy">Armenian (hy)</option><option value="az">Azerbaijani (az)</option><option value="eu">Basque (eu)</option><option value="be">Belarusian (be)</option><option value="bn">Bengali (bn)</option><option value="bs">Bosnian (bs)</option><option value="bg">Bulgarian (bg)</option><option value="ca">Catalan (ca)</option><option value="ceb">Cebuano (ceb)</option><option value="ny">Chichewa (ny)</option><option value="zh">Chinese (Simplified) (zh)</option><option value="zh-TW">Chinese (Traditional) (zh-TW)</option><option value="co">Corsican (co)</option><option value="hr">Croatian (hr)</option><option value="cs">Czech (cs)</option><option value="da">Danish (da)</option><option value="nl">Dutch (nl)</option><option value="en" selected="selected">English (en)</option><option value="eo">Esperanto (eo)</option><option value="et">Estonian (et)</option><option value="tl">Filipino (tl)</option><option value="fi">Finnish (fi)</option><option value="fr">French (fr)</option><option value="fy">Frisian (fy)</option><option value="gl">Galician (gl)</option><option value="ka">Georgian (ka)</option><option value="de">German (de)</option><option value="el">Greek (el)</option><option value="gu">Gujarati (gu)</option><option value="ht">Haitian Creole (ht)</option><option value="ha">Hausa (ha)</option><option value="haw">Hawaiian (haw)</option><option value="iw">Hebrew (iw)</option><option value="hi">Hindi (hi)</option><option value="hmn">Hmong (hmn)</option><option value="hu">Hungarian (hu)</option><option value="is">Icelandic (is)</option><option value="ig">Igbo (ig)</option><option value="id">Indonesian (id)</option><option value="ga">Irish (ga)</option><option value="it">Italian (it)</option><option value="ja">Japanese (ja)</option><option value="jw">Javanese (jw)</option><option value="kn">Kannada (kn)</option><option value="kk">Kazakh (kk)</option><option value="km">Khmer (km)</option><option value="ko">Korean (ko)</option><option value="ku">Kurdish (Kurmanji) (ku)</option><option value="ky">Kyrgyz (ky)</option><option value="lo">Lao (lo)</option><option value="la">Latin (la)</option><option value="lv">Latvian (lv)</option><option value="lt">Lithuanian (lt)</option><option value="lb">Luxembourgish (lb)</option><option value="mk">Macedonian (mk)</option><option value="mg">Malagasy (mg)</option><option value="ms">Malay (ms)</option><option value="ml">Malayalam (ml)</option><option value="mt">Maltese (mt)</option><option value="mi">Maori (mi)</option><option value="mr">Marathi (mr)</option><option value="mn">Mongolian (mn)</option><option value="my">Myanmar (Burmese) (my)</option><option value="ne">Nepali (ne)</option><option value="no">Norwegian (no)</option><option value="ps">Pashto (ps)</option><option value="fa">Persian (fa)</option><option value="pl">Polish (pl)</option><option value="pt">Portuguese (pt)</option><option value="pa">Punjabi (pa)</option><option value="ro">Romanian (ro)</option><option value="ru">Russian (ru)</option><option value="sm">Samoan (sm)</option><option value="gd">Scots Gaelic (gd)</option><option value="sr">Serbian (sr)</option><option value="st">Sesotho (st)</option><option value="sn">Shona (sn)</option><option value="sd">Sindhi (sd)</option><option value="si">Sinhala (si)</option><option value="sk">Slovak (sk)</option><option value="sl">Slovenian (sl)</option><option value="so">Somali (so)</option><option value="es">Spanish (es)</option><option value="su">Sundanese (su)</option><option value="sw">Swahili (sw)</option><option value="sv">Swedish (sv)</option><option value="tg">Tajik (tg)</option><option value="ta">Tamil (ta)</option><option value="te">Telugu (te)</option><option value="th">Thai (th)</option><option value="tr">Turkish (tr)</option><option value="uk">Ukrainian (uk)</option><option value="ur">Urdu (ur)</option><option value="uz">Uzbek (uz)</option><option value="vi">Vietnamese (vi)</option><option value="cy">Welsh (cy)</option><option value="xh">Xhosa (xh)</option><option value="yi">Yiddish (yi)</option><option value="yo">Yoruba (yo)</option><option value="zu">Zulu (zu)</option></select>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="transcribe_languageTo">Second language (when direction is set to Both, than this option is valid for the visitor):</label>
                            <select class="form-control" name="transcribe_languageTo" id="transcribe_languageTo"><option value="af">Afrikaans (af)</option><option value="sq">Albanian (sq)</option><option value="am">Amharic (am)</option><option value="ar">Arabic (ar)</option><option value="hy">Armenian (hy)</option><option value="az">Azerbaijani (az)</option><option value="eu">Basque (eu)</option><option value="be">Belarusian (be)</option><option value="bn">Bengali (bn)</option><option value="bs">Bosnian (bs)</option><option value="bg">Bulgarian (bg)</option><option value="ca">Catalan (ca)</option><option value="ceb">Cebuano (ceb)</option><option value="ny">Chichewa (ny)</option><option value="zh">Chinese (Simplified) (zh)</option><option value="zh-TW">Chinese (Traditional) (zh-TW)</option><option value="co">Corsican (co)</option><option value="hr">Croatian (hr)</option><option value="cs">Czech (cs)</option><option value="da">Danish (da)</option><option value="nl">Dutch (nl)</option><option value="en" selected="selected">English (en)</option><option value="eo">Esperanto (eo)</option><option value="et">Estonian (et)</option><option value="tl">Filipino (tl)</option><option value="fi">Finnish (fi)</option><option value="fr">French (fr)</option><option value="fy">Frisian (fy)</option><option value="gl">Galician (gl)</option><option value="ka">Georgian (ka)</option><option value="de">German (de)</option><option value="el">Greek (el)</option><option value="gu">Gujarati (gu)</option><option value="ht">Haitian Creole (ht)</option><option value="ha">Hausa (ha)</option><option value="haw">Hawaiian (haw)</option><option value="iw">Hebrew (iw)</option><option value="hi">Hindi (hi)</option><option value="hmn">Hmong (hmn)</option><option value="hu">Hungarian (hu)</option><option value="is">Icelandic (is)</option><option value="ig">Igbo (ig)</option><option value="id">Indonesian (id)</option><option value="ga">Irish (ga)</option><option value="it">Italian (it)</option><option value="ja">Japanese (ja)</option><option value="jw">Javanese (jw)</option><option value="kn">Kannada (kn)</option><option value="kk">Kazakh (kk)</option><option value="km">Khmer (km)</option><option value="ko">Korean (ko)</option><option value="ku">Kurdish (Kurmanji) (ku)</option><option value="ky">Kyrgyz (ky)</option><option value="lo">Lao (lo)</option><option value="la">Latin (la)</option><option value="lv">Latvian (lv)</option><option value="lt">Lithuanian (lt)</option><option value="lb">Luxembourgish (lb)</option><option value="mk">Macedonian (mk)</option><option value="mg">Malagasy (mg)</option><option value="ms">Malay (ms)</option><option value="ml">Malayalam (ml)</option><option value="mt">Maltese (mt)</option><option value="mi">Maori (mi)</option><option value="mr">Marathi (mr)</option><option value="mn">Mongolian (mn)</option><option value="my">Myanmar (Burmese) (my)</option><option value="ne">Nepali (ne)</option><option value="no">Norwegian (no)</option><option value="ps">Pashto (ps)</option><option value="fa">Persian (fa)</option><option value="pl">Polish (pl)</option><option value="pt">Portuguese (pt)</option><option value="pa">Punjabi (pa)</option><option value="ro">Romanian (ro)</option><option value="ru">Russian (ru)</option><option value="sm">Samoan (sm)</option><option value="gd">Scots Gaelic (gd)</option><option value="sr">Serbian (sr)</option><option value="st">Sesotho (st)</option><option value="sn">Shona (sn)</option><option value="sd">Sindhi (sd)</option><option value="si">Sinhala (si)</option><option value="sk">Slovak (sk)</option><option value="sl">Slovenian (sl)</option><option value="so">Somali (so)</option><option value="es">Spanish (es)</option><option value="su">Sundanese (su)</option><option value="sw">Swahili (sw)</option><option value="sv">Swedish (sv)</option><option value="tg">Tajik (tg)</option><option value="ta">Tamil (ta)</option><option value="te">Telugu (te)</option><option value="th">Thai (th)</option><option value="tr">Turkish (tr)</option><option value="uk">Ukrainian (uk)</option><option value="ur">Urdu (ur)</option><option value="uz">Uzbek (uz)</option><option value="vi">Vietnamese (vi)</option><option value="cy">Welsh (cy)</option><option value="xh">Xhosa (xh)</option><option value="yi">Yiddish (yi)</option><option value="yo">Yoruba (yo)</option><option value="zu">Zulu (zu)</option></select>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="transcribe_direction">Direction (defining the direction of the speech to text or translation demo):</label>
                            <select class="form-control" name="transcribe_direction" id="transcribe_direction"><option value="agent">From Agent</option><option value="visitor">From Visitor</option><option value="both">Both Directions</option></select>
                        </div>
                        <hr>
                        <div class="custom-control">
                            <label for="transcribe_apiKey">API key (necessary for the translation demo. This is the Google key for translation API):</label>
                            <input type="text" class="form-control" id="transcribe_apiKey" aria-describedby="transcribe_apiKey">
                        </div>


                    </div>
                    <hr>
                    <div class="form-group">
                        <h6>STUN/TURN (for more information about STUN/TURN servers, check <a href="https://www.new-dev.com/page/ident/live_smart_video_chat_installation#stunturn" target="_blank">here</a>)</h6>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" value="1" id="iceServers_requirePass">
                            <label class="custom-control-label" for="iceServers_requirePass">Username and password are encrypted. Please read <a href="https://www.new-dev.com/page/ident/live_smart_video_chat_code" target="_blank">here</a> how to encrypt your username and password.</label>
                        </div>
                        <br/>
                        <label for="videoScreen_screenConstraint">STUN/TURN Values:</label>

                        <div class="custom-control">
                            <textarea class="form-control" id="iceServers" rows="8"></textarea>
                        </div>

                    </div>

                    <a href="javascript:void(0);" id="saveConfig" class="btn btn-primary btn-user btn-block">
                        Save
                    </a>
                    <hr>


                </form>

            </div>

        </div>
        <div class="col-sm-6">
            <div class="p-1">
                <h6>Choose a configuration from the list below. The default one is config and is loaded initially. 
                    If you need to add another configuration set, choose a name and click on Add button. <br>
                    For example if you need a separate configuration with whiteboard enabled, add configuration with name config_whiteboard and click on Add button. Then you can edit it from from the left form by enabling the Whiteboard option. <br/>
                    Then the specific whiteboard configuration can be chosed in the Room management form.
                </h6>
                <br/>
                <div class="form-group">
                    <label for="roomName"><h6>Configuration name</h6></label>
                    <input type="text" class="form-control" id="fileName" aria-describedby="fileName">
                </div>
                <a href="javascript:void(0);" id="addConfig" class="btn btn-primary btn-user btn-block">
                    Add
                </a>
                <br/>
                <?php
                if ($handle = opendir('../config')) {
                    echo '<a href="config.php" class="btn btn-light">config</a><hr>';
                    while (false !== ($entry = readdir($handle))) {
                        if ($entry != "." && $entry != ".." && $entry != "config.json") {
                            $entry = substr($entry, 0, -5);
                            $delete = '| <a href="deleteconfig.php?file=' . $entry . '" id="deleteConfig' . $entry . '" class="btn btn-light">Delete</a>';
                            echo '<a href="config.php?file=' . $entry . '" class="btn btn-light">' . $entry . '</a>' . $delete . '<hr>';
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
