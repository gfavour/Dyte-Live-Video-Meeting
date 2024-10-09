    meeting = GetStorage('getjson','aalmeeting');
    participant = GetStorage('getjson','aalparticipant');
    
    if(meeting){
        meetingId = meeting.id;
        ShowResult("result","<b>Title:</b> "+meeting.title+"<br><b>Meeting ID</b>: "+meetingId+"<br><b>Date</b>: "+ReformatDateTime(meeting.created_at),"success");
        let invStr = GetInviteLink();
        ShowResult("invlink",'<div style="background:#eee;padding:10px;margin-bottom:15px;">'+invStr+'</div>',"");
        ShowHide("start","0");
        ShowHide("inpMain","0");

        if(participant){ 
            participantId = participant.id;
            partToken = participant.token;
            ShowHide("launch","1");
        }else{
            AddParticipant(globalid,globalname,globalpic);
        }
        ShowHide("stopvid","1");        
    }else{
        ShowHide("start","1");
        ShowHide("inpMain","1");
        ShowHide("stopvid","0");
        ShowHide("launch","0");
    }
    