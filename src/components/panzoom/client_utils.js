
function event(element,event_name,data=null){
	var event = new CustomEvent(event_name, {detail:data});
	element.dispatchEvent(event);
}

function window_event(event_name,data){
	var event = new CustomEvent(event_name, {detail:data});
	window.dispatchEvent(event);
}

export{
    event,
    window_event
}
