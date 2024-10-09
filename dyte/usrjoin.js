const searchParams = new URL(window.location.href).searchParams;
//authToken = searchParams.get('authtoken');
const meetID = searchParams.get('meetid');
//let Err = false, errMsg = '', 
let saveAuthToken = '';
meeting = GetStorage('getjson','aalmeeting');
participant = GetStorage('getjson','aalparticipant');
initiator = GetStorage('get','initiator');
ShowResult('result','','');
/////////////////////////////
const ShowStartObjects = ()=>{
    //ShowHide("mymeeting","0"); 
    ShowHide("joinbox","1"); ShowHide("inpMain","1");
    ShowHide("lvmain","1"); ShowHide("result","1");
}
const ShowVideoObjects = ()=>{
    //ShowHide("mymeeting","1"); 
    ShowResult("result","",""); ShowHide("joinbox","0");
}
////////////////////////////
const AddPartByClient = ()=>{
    let cpartID = document.getElementById("phone").value;
    let name = document.getElementById("name").value;
    let pic = globalpic;
    
    meeting = GetStorage('getjson','aalmeeting');

    const body = '{"name":"'+name+'","picture":"'+pic+'","preset_name":"AgentAwayPreset","custom_participant_id":"'+cpartID+'"}';    
        
    if(meeting){
        meetingId = meeting.id;
        if(cpartID == ''){ ShowResult("result","Participant ID is missing!","error"); }
        else if(name == ''){ ShowResult("result","Participant name is missing!","error"); }
        else if(meetingId == ''){ ShowResult("result","Meeting not available!","error"); }
        else{
            let url = urlMeetings+'/'+meetingId+'/participants';
            if(GetDyte(url,body,'pbyc',"Basic",'POST')){
                authToken = partToken; 
                if(authToken){ Launch(authToken); }
            }
        }
    }else{
        ShowResult("result","No meeting to join!","error");
    }
}
////////////////////////////////////
if(meetID){ // != null && meetID != ''
    if(meeting){
        meetingId = meeting.id;
        ShowResult("restitled",", titled: "+meeting.title,"success");
    }else{
        if(GetMeeting(meetID)){
            meeting = GetStorage('getjson','aalmeeting');
            if(meeting){ meetingId = meeting.id; }
        }else{
            ShowResult('result','Invalid meeting! Contact your agent to join a meeting. Are you a real estate agent? <a href="../signup">Sign up</a> on agentaway.com to get started!','error');
        }
    }
    
    if(participant){
        participantId = participant.id;
        saveAuthToken = participant.token;
        if(saveAuthToken){
            authToken = participant.token;
            Launch(authToken);
        }else{
            ShowStartObjects();
        }
    }else{
        ShowStartObjects();
    }
}else if(authToken != null && authToken != ''){
    Launch(authToken);
}else{
    ShowStartObjects();
    ShowResult('result','Invalid meeting! Contact your agent to join a meeting. Are you a real estate agent? <a href="../signup">Sign up</a> on agentaway.com to get started!','error');
}
////////////////////

