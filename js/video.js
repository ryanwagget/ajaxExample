var video =
	{
		//variables at the top
		videoPlayer : document.querySelector('video'),
		vidThumbs : document.querySelectorAll('.vid-thumb'),
		volumeIndicator : document.querySelector('.vol-indicator'),
		
		//then functonality
		init()
		{
			console.log('video module added');
		}
	}

video.init();