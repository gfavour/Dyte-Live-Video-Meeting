var globalid = '1';
var globalname = 'Agent Mike';
var globalpic = 'https://agentaway.com/archives/noimage.png';
var endpoint = 'https://api.dyte.io/v2/';
var basicAuth = btoa('02c504df-8023-4cc0-8c9a-431da3ea5a40:606496fb9a0d4603fa7a');
var authToken = '';
var siteUrl = 'http://localhost/dytelivevideo/';
var specialUID = Math.floor((new Date()).getTime() / 1000);
//////////////////
let initiator = null;
let meeting = null;
let meetingId = null;
let meetingTitle = null;
let meetings = null;
let participant = null;
let participantId = null;
let partToken = null;
let liveStreamId = {"id":"","url":"","status":""};

var urlMeetings = endpoint+'meetings';
var urlRecordings = endpoint+'recordings';
/////////////////////////////
const GetStorage = (todo,name,jsondata)=>{
    let r = null;
    if(todo == 'set'){
        localStorage.setItem(name,jsondata);
    }else if(todo == 'setjson'){
        localStorage.setItem(name,JSON.stringify(jsondata));
    }else if(todo == 'getjson'){
        r = localStorage.getItem(name);
        r = JSON.parse(r);
        return r;
    }else{
        r = localStorage.getItem(name);
        return r;
    }
}
///////////////////////////////////
const ReformatDateTime = (str)=>{
    let dt = str.split("T");
    let tsec = dt[1].split(".");
    return dt[0]+" "+tsec[0];
}
/////////////
const ShowHide = (obj,t)=>{
    if(t == '1'){
        document.getElementById(obj).style.display = 'block';
    }else{
        document.getElementById(obj).style.display = 'none';
    }
}
////////////////
const ShowResult = (objID,v,mtype)=>{
    if(mtype === "error"){
        document.getElementById(objID).innerHTML = '<span style="color:red;">'+v+'</span>';
    }else{
        document.getElementById(objID).innerHTML = v;
    }
}
////////////
const Launch = (auth)=>{
    if(auth == ''){ auth = partToken; }
    let url = siteUrl+'golive/start/?authtoken='+auth;
    //alert(siteUrl);
    //window.open(url,"winls","address=0,standard=0");
    window.location.href = 'start/?authtoken='+auth;
}
//////////////
const initLivestream = async (authToken) => {
    meetings = await DyteClient.init({ authToken }).then(m);
    meetings.then((m)=>{
        document.getElementById('mymeeting').meeting = m;
    });
}

const stopLivestream = (mID)=>{
    let url = urlMeetings+'/'+mID+'/active-livestream/stop';
    let res = GetDyte(url,'','Stopls',"Basic",'POST');
}

const joinMeeting = async () => {
    meetings.self.on('roomJoined', () => {
        console.log("Successfully joined the room!");
    });      
    await meetings.join();
}

const leaveMeeting = async ()=>{
    meetings.self.on('roomLeft', () => {
        let thisInitiator = globalid+'-'+meetingId;
        if(initiator === thisInitiator){
            //stop live stream and kick out all participants....
            KickAll(); stopLivestream(meetingId);
            //update to database...
            console.log("Left room and kicked others out.");
        }else{console.log("Left room");}
    });
    await meetings.leaveRoom();
}
///////////////////////////
const GetDyte = async (url,mbody,todo='m',AuthType="Basic",Mth="POST")=>{
    let authStr = (AuthType == 'Basic')?'Basic '+basicAuth:'Bearer '+partToken;
    Mth = (Mth == 'GET')?'GET':'POST';
    let options = null;
    if(todo == 'fm'){
        options = { method: Mth, headers: {'Content-Type': 'application/json',Accept: 'application/json', Authorization: authStr }};
    }else{
        options = { method: Mth, headers: {'Content-Type': 'application/json',Accept: 'application/json', Authorization: authStr }, body: mbody};
    }

try {
  const response = await fetch(url, options);
  const res = await response.json();

    if(todo == 'm'){
        if(res.success == true){
            meeting = res.data;
            meetingId = res.data.id;
            GetStorage('setjson','aalmeeting',res.data);
            GetStorage('set','initiator',globalid+'-'+meetingId);
            ShowResult("result","Title: "+res.data.title+"<br>ID: "+meetingId+"<br>Meeting Date: "+ReformatDateTime(res.data.created_at),"success");
            return true;
        }else{
            ShowResult("result","Creating meeting failed! "+JSON.stringify(res),"error");
            return false;
        } 
    }else if(todo == 'fm'){ 
        if(res.success == true){
            meetingId = res.data.id;
            GetStorage('setjson','aalmeeting',res.data);
            //ShowResult("result","Titled: "+res.data.title+"<br>Meeting ID: "+meetingId+"<br>Meeting Date: "+res.data.created_at,"success");
            ShowResult("restitled",", titled: "+res.data.title,"success");
            return true;
        }else{
            ShowResult("result","Meeting could not be found!","error");
            return false;
        } 
    }else if(todo == 'p'){ 
        if(res.success == true){
            participantId = res.data.id;
            partToken = res.data.token;
            authToken = res.data.token;
            GetStorage('setjson','aalparticipant',res.data);
            //ShowResult("result2","<hr>Participant Name: "+res.data.name+"<br>ID: "+participantId,"success");
            ShowHide("launch","1");
            return true;
        }else{
            ShowResult("result","Joining the meeting not allowed! Kindly contact the agent in charge.","error");
            return false;
        } 
    }else if(todo == 'pbyc'){
        if(res.success == true){
            participantId = res.data.id;
            partToken = res.data.token;
            authToken = res.data.token;
            GetStorage('setjson','aalparticipant',res.data);
            Launch(authToken);
            return true;
        }else{
            ShowResult("result","Joining the meeting failed. Err "+res.error.code+": "+res.error.message,"error");
            return false;
        }   
    }else if(todo == 'r'){
        if(res.success == true){
            recordId = res.data.id;
        }
    }else if(todo == 'kall'){
        if(res.success == true){
            alert("All participants stopped from the meeting!");
        }
    }else if(todo == 'lsByMid'){
        if(res.success == true){
            liveStreamId = {"id":res.data.livestream.id,"url":res.data.livestream.playback_url,"status":res.data.livestream.status};
            GetStorage('setjson','ls',res.data.livestream); 
            //You can save sessions array object with it...
            //save to database...
            return true;
        }else{
            alert("No Live streaming!");
            return false;
        }
    }else if(todo == 'Stopls'){
        if(res.success == true){
            localStorage.clear();
            window.opener.reload();
            window.close();
        }
    }
} catch (error) {
    ShowResult("result",error,"error");
}
}
//rtmp://b.rtmp.youtube.com/live2?backup=1
const CreateNewMeeting = ()=>{
    //Agent meeting with client(s) on agentaway.com
    let title = document.getElementById("title").value;
    if(title == ''){alert("Title of the meeting is required!"); return; }

    var body1 = '{"title":"'+title+'","preferred_region":"ap-south-1","record_on_start":false,"live_stream_on_start":false,"recording_config":{"max_seconds":60,"file_name_prefix":"aaluid","video_config":{"codec":"H264","width":1280,"height":720,"watermark":{"url":"https://agentaway.com","size":{"width":1,"height":1},"position":"left top"},"export_file":true},"audio_config":{"codec":"AAC","channel":"stereo","export_file":true},"storage_config":{"type":"aws","access_key":"string","secret":"string","bucket":"string","region":"us-east-1","path":"string","auth_method":"KEY","username":"string","password":"string","host":"string","port":0,"private_key":"string"}},"ai_config":{"transcription":{"keywords":["string"],"language":"en-US","profanity_filter":false},"summarization":{"word_limit":500,"text_format":"markdown","summary_type":"general"}},"persist_chat":false,"summarize_on_end":false}';
    
    let r1 = GetDyte(urlMeetings,body1,'m',"Basic",'POST');
    if(r1){
        AddParticipant(globalid,globalname,globalpic);
        //Send to database.....meetingId,initiator
        ShowHide("inpMain","0");
        ShowHide("start","0");
        ShowHide("stopvid","1");
        ShowHide("launch","1");
        //////////////
        let invitelink = GetInviteLink();
        ShowResult("invlink",invitelink,"");        
    }
}

const AddParticipant = (cpartID,name,pic)=>{
    const body = '{"name":"'+name+'","picture":"'+pic+'","preset_name":"AgentAwayPreset","custom_participant_id":"'+cpartID+'"}';
    
    let url = urlMeetings+'/'+meetingId+'/participants';
    
    if(meeting){
        if(cpartID == ''){ alert("Participant ID is missing!"); }
        else if(name == ''){ alert("Participant name is missing!"); }
        else if(meetingId == ''){ alert("Meeting not available!"); }
        else{
            GetDyte(url,body,'p',"Basic",'POST');
        }
    }else{
        //alert("No meeting to join!");
        window.location.reload();
    }
}

const StartRecording = (userType = 'o',mID,pToken="")=>{ //o = orgnization, p = participant
    const body = '{"meeting_id":"'+mID+'","max_seconds":60,"storage_config":{"type":"aws","access_key":"string","secret":"string","bucket":"string","region":"us-east-1","path":"string","auth_method":"KEY","username":"string","password":"string","host":"string","port":0,"private_key":"string"},"video_config":{"codec":"H264","width":1280,"height":720,"watermark":{"url":"https://agentaway.com","size":{"width":1,"height":1},"position":"left top"},"export_file":true},"audio_config":{"codec":"AAC","channel":"stereo","export_file":true},"rtmp_out_config":{"rtmp_url":"rtmp://a.rtmp.youtube.com/live2"},"file_name_prefix":"string","url":"https://agentaway.com","dyte_bucket_config":{"enabled":true},"interactive_config":{"type":"ID3"},"allow_multiple_recordings":false}';
    const url = urlMeetings+'/recordings';

    if(mID != ''){
        if(userType == 'o'){
            GetDyte(url,body,'r',"Basic",'POST');
        }else{
            if(partToken == ''){ alert("Participant Token is missing!"); }
            else{
                GetDyte(url,body,'r',"Bearer",'POST');
            }
        }
    }else{
        alert("No meeting specified. Recording aborted!");
    }
}

const KickAll = ()=>{
    let url = urlMeetings+'/'+meetingId+'/active-session/kick-all';
    GetDyte(url,'','kall',"Basic",'POST');
}

const GetMeeting = (mID)=>{
    let url = urlMeetings+'/'+mID;
    let res = GetDyte(url,'','fm',"Basic",'GET');
    if(res){
        return true;
    }
}

const GetParticipants = (pID,isAll=false)=>{
    //https://docs.dyte.io/api/#/operations/get_meeting_participant
    //DELETE: https://api.dyte.io/v2/meetings/{meeting_id}/participants/{participant_id}
    if(meetingId){
        let url = urlMeetings+'/'+meetingId+'/participants';
        if(!isAll){ url = urlMeetings+'/'+meetingId+'/participants/'+pID; }
        let res = GetDyte(url,'','fp',"Basic",'GET');
        //if(res){}
    }
}

const DeleteParticipant = (pID)=>{
    //DELETE: https://api.dyte.io/v2/meetings/{meeting_id}/participants/{participant_id}
    if(meetingId){
        let url = urlMeetings+'/'+meetingId+'/participants/'+pID;
        GetDyte(url,'','delp',"Basic",'DELETE');
    }
}

const Copy2Clipboard = (str)=>{
    navigator.clipboard.writeText(str);
    alert("Copied successfully!");
}
const GetInviteLink = ()=>{
    if(meetingId){
        let copylink = '<a href="javascript:;" class="shareicon" onClick="Copy2Clipboard(\''+siteUrl+'golive/?meetid='+meetingId+'\')"><i class="bi bi-link-45deg"></i></a>';
        let walink = '<a href="https://wa.me/?text='+siteUrl+'golive/?meetid='+meetingId+'" class="waicon shareicon" target="_Blank"><i class="bi bi-whatsapp"></i></a>';

        return '<div class="pl-1 pr-1">Share the link below with your clients to join the live meeting: <a href="'+siteUrl+'golive/?meetid='+meetingId+'" target="_Blank" style="display:block;">'+siteUrl+'golive/?meetid='+meetingId+'</a>'+walink+copylink+'</div>';
    }else{
        return "";
    }
}

const GotoMeeting = ()=>{
    let url = siteUrl+'golive/start?authtoken='+partToken;
    window.open(url,"winls","address=0,standard=0");
}

const Fetcher = ()=>{
    
}