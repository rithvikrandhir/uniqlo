import WebGLView from './webgl/WebGLView';
import GUIView from './gui/GUIView';
import { TweenMax } from 'gsap/TweenMax';
// import { ScrollMagic } from 'scrollmagic';
// import from './'
export default class App {



	constructor() {

	}

	init() {
		this.initWebGL();
		this.initGUI();
		this.addListeners();
		this.animate();
		this.resize();
		this.scroll();
		this.storyPosition = 0;
		this.storyNumber = 0;
		this.storyline = document.querySelector('.story');
		this.button = document.querySelector('.nav-button');
		this.button.addEventListener('click', () => {
			console.log("clicked");
			window.location.replace('/madeforall.html');
		})
		this.storylines = [

			[
				"Mali started running because her high school crush was on the track team.",
				"That was 6 years ago, and she no longer remembers his face.",
				"But she remembers her first race, her first pair of running shoes.",
				"Running was catharsis.",
				"The world slowed down as she sped up.",
				"The wind in her hair.",
				"The rhythm of her breath.",
				"It was never about getting somewhere.",
				"But that she was getting there on her own two feet.",
				"This was the greatest gift she’d given herself.",
				"And no one could take it away from her."
			],
			[
				"Life happens in memorable moments.",
				"But Yufei always liked capturing the in-between.",
				"These are the things you tend to forget,",
				"but Yufei wants to remember.",
				"The way the light strikes the side of her apartment building every morning.",
				"The second her friend’s eyes light up before he laughs.",
				"The way these things make her feel every day.",
				"She never could get used to being called a ‘photographer’.",
				"She’d blush and think, it’s not real art.",
				"I simply capture.",
				"But capturing a feeling is an art.",
				"Her pictures aren’t just static images, Diagram A and Diagram B.",
				"They convey a feeling.",
				"And that’s her mark on the world.",
			],
			[
				"Emilie always loved drawing more than anything else.",
				"Her parents used to give her colouring books,",
				"Until they realised she only liked to colour outside the lines.",
				"Soon enough, she was drawing her own lines altogether.",
				"For awhile she drew simply because she preferred it to any other activity",
				"but eventually she realised it was the one way she felt she could really reach people",
				"No need for context, explanations, relating it back to anything.",
				"Her favourite part was watching other people’s faces as they looked at her work.",
				"Seeing the subtle changes in their expressions,",
				"Imagining the wildly different thoughts they had while looking at the same thing.",
				"She felt like she was creating a lens to the world."
			],
			[
				"Raj never had one single life ambition.",
				"This used to make him feel worthless.",
				"What’s a person without a purpose?",
				"But amidst a sea of strangers telling him he needed to find a direction,",
				"The sound of a guitar. A beacon.",
				"It surprised him, how easily his fingers found the strings.",
				"He liked the feeling of mastering a favourite song,",
				"But he liked improvising even more.",
				"Even if you played a note, a riff that didn’t quite fit,",
				"You could keep building on it.",
				"You could make it work.",
				"Anything goes.",
				"This became his life philosophy."
			],
			[
				"Noah always felt like another person when dancing.",
				"He was always one of the invisible guys.",
				"Never the coolest. The sportiest. The funniest.",
				"Just another guy.",
				"But the day he started dancing, he became someone else.",
				"And people watched him.",
				"They didn’t see his hands shaking. Or worry in his eyes.",
				"They saw the way his body wove in and out of the beat.",
				"How he closed his eyes and let the music wash over him.",
				"He never fully understood it.",
				"How he could feel more like himself,",
				"By becoming someone else.",
				"But maybe it was because this was who he was meant to be."
			],
			[
				"Adnan used to escape into books as a child.",
				"He loved being able to enter an entirely different universe,",
				"only with words - as if by magic.",
				"The first time he put his own words to paper,",
				"he realised how scary it was, letting someone else into your world.",
				"But he pushed himself to do it.",
				"Because he had been given the gift of traveling to so many places",
				"and he wanted to do the same for others.",
				"He thought stories had been helping him escape his entire time,",
				"But really, they had helped him appreciate",
				"what it was to face things fully, completely,",
				"never half-asleep."
			]
		]

		this.backgrounds = [
			"url(../images/BG1-1.png)",
			"url(../images/BG2-1.png)",
			"url(../images/BG3-1.png)",
			"url(../images/BG4-1.png)",
			"url(../images/BG5-1.png)",
			"url(../images/BG6-1.png)",

		]
		this.bgPosition = 1;
		this.storyline.innerHTML = `${this.storylines[this.storyNumber][this.storyPosition++]}`;
	}

	initWebGL() {
		this.webgl = new WebGLView(this);
		document.querySelector('.container').appendChild(this.webgl.renderer.domElement);
	}

	initGUI() {
		this.gui = new GUIView(this);
		//this.gui.toggle();
	}

	


	addListeners() {
		this.handlerAnimate = this.animate.bind(this);

		window.addEventListener('resize', this.resize.bind(this));
		window.addEventListener('keyup', this.keyup.bind(this));

		const el = this.webgl.renderer.domElement;
		el.addEventListener('click', this.click.bind(this));
	}

	animate() {
		this.update();
		this.draw();

		this.raf = requestAnimationFrame(this.handlerAnimate);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		if (this.gui.stats) this.gui.stats.begin();
		if (this.webgl) this.webgl.update();
		if (this.gui) this.gui.update();
	}

	draw() {
		if (this.webgl) this.webgl.draw();
		if (this.gui.stats) this.gui.stats.end();
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		if (this.webgl) this.webgl.resize();
	}

	keyup(e) {
		// g

		if (e.keyCode == 71) { if (this.gui) this.gui.toggle(); }
		if (e.keyCode == 32) {

			if (this.gui) this.webgl.next();
			TweenMax.fromTo('.spacebar', 0.3, { width: '410px', height: '50px', boxShadow: '2px 7px rgba(0, 0, 0, 0.0)', ease: Power3.easeOut },
				{ width: '400px', height: '60px', boxShadow: '2px 7px rgba(0, 0, 0, 0.1)', ease: Power3.easeIn }, 1);
			if (this.bgPosition > this.backgrounds.length - 1) {
				this.bgPosition = 0;
			}

			if (this.storyNumber < this.storylines.length) {
				console.log("Story Number (before) - " + this.storyNumber);
				if (this.storyNumber < 5) {
					this.storyNumber++;
				} else {
					this.storyNumber = 0;
				}
				console.log("Story Number - " + this.storyNumber);
				console.log("Story Position - " + this.storyPosition);
				this.storyPosition = 0;
				this.storyline.innerHTML = `${this.storylines[this.storyNumber][this.storyPosition]}`;

			}
			document.querySelector('.scroll-frame').style.backgroundImage = this.backgrounds[this.bgPosition];
			this.bgPosition++;
			console.log("BG Image - " + document.querySelector('.scroll-frame').style.backgroundImage);
			TweenMax.fromTo(".demo-1", 1, { opacity: 0.5 }, { opacity: 1 });
			console.log("BG index" + this.bgPosition);
		}
		if (e.keyCode == 39) {

			TweenMax.fromTo('.up-right', 0.3, { width: '48px', boxShadow: '2px 7px rgba(0, 0, 0, 0.0)', ease: Power3.easeOut },
				{ width: '58px', boxShadow: '2px 7px rgba(0, 0, 0, 0.1)', ease: Power3.easeIn }, 1);
			if (this.storyPosition < this.storylines[this.storyNumber].length - 1) {
				this.storyPosition++;
			}
			console.log(`Key down -  story position is - ${this.storyPosition}`);
			this.storyline.innerHTML = `${this.storylines[this.storyNumber][this.storyPosition]}`;
			TweenMax.fromTo(this.storyline, 1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, color: 'white' })
		}
		if (e.keyCode == 37) {

			TweenMax.fromTo('.down-left', 0.3, { width: '48px', boxShadow: '2px 7px rgba(0, 0, 0, 0.0)', ease: Power3.easeOut },
				{ width: '58px', boxShadow: '2px 7px rgba(0, 0, 0, 0.1)', ease: Power3.easeIn }, 1);
			console.log(`Key up -  story position is - ${this.storyPosition}`);
			if (this.storyPosition > 0) {
				this.storyPosition--;
			}
			this.storyline.innerHTML = `${this.storylines[this.storyNumber][this.storyPosition]}`;
			TweenMax.fromTo(this.storyline, 1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, color: 'white' })
		}
	}

	click(e) {
		//this.webgl.next();
	}
	
	scroll() {

	}
}
