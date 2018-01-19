export function formatDate(date){
	var today = new Date();
	if (today.getTime() - date.getTime() < 1000*60*60*24){
		return "Today";
	}
	var ago = 0;
	var period = "";
	if (today.getMonth() == date.getMonth()){
		ago = today.getDate() - date.getDate();
		period = "day";
		if (ago >= 7){
			ago = Math.floor(ago/7);
			period = "week"
		}
	}
	else if (today.getYear() == date.getYear()){
			ago = today.getMonth() - date.getMonth();
			period = "month";
	}

	else{
			ago = today.getYear() - date.getYear();
			period = "year";
	}

	if (ago != 1){
		period = period + 's';
	}

	return ago + " " + period + " ago";
}