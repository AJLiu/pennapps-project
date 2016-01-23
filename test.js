var request = require('request');

request.post({
	url:"http://localhost:3000/competitions/",
	json:{
		name: "mhacks",
        start_date: "2016-2-19",
        end_date: "2015-10-21",
        prompt: "supersecretstuffs"
	}
})
