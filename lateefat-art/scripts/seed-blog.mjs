import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'f5jgmo2u',
  dataset: 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text }],
    markDefs: [],
  }
}

function quote(text) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'blockquote',
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text }],
    markDefs: [],
  }
}

const posts = [
  {
    _id: 'post-in-between-cultures',
    _type: 'post',
    title: 'In Between Cultures',
    slug: { _type: 'slug', current: 'in-between-cultures' },
    outlet: 'Lateefat Tobun',
    kind: 'Journal',
    published_at: '2025-03-12T09:00:00.000Z',
    excerpt: 'Living between two cultures is not a crisis. It is a kind of creative inheritance.',
    standfirst: 'On growing up between two worlds, and how that restlessness became the engine of everything I make.',
    body: [
      block('There is a question I have been asked more times than I can count: where are you from, really? The person asking usually already knows the city I live in, the accent I carry, the passport I hold. What they are reaching for is the other thing — the root beneath the root.'),
      block('I grew up moving between two cultures, two sets of expectations, two languages of the self. Nigerian in the home, British in the world outside. Neither place fully claimed me, and for a long time I thought that was something to overcome.'),
      quote('Living between two cultures is not a crisis. It is a kind of creative inheritance.'),
      block('It took me years to understand that the discomfort was not a gap to be filled but a space to be inhabited. The work I make now lives in that in-between. Colour that does not belong to one tradition. Forms that refuse to settle. Patterns that move between West African textile lineage and contemporary digital aesthetics without apology.'),
      block('Fabric has become one of my primary materials precisely because it holds this tension so well. Cloth carries culture. It carries memory. A piece of ankara placed beside a digital printout is not a contradiction — it is a conversation across generations, across geographies.'),
      block('My grandmother\'s wrappers. The racks of polyester school uniforms. The first time I pulled up a digital swatch on screen and felt the texture of it behind my eyes. These are not separate memories. They are the same reaching, the same hunger to understand what beauty means when the world has given you more than one answer.'),
      block('I no longer try to resolve the in-between. I try to honour it. Every piece I make is an attempt to hold both — to say: I was here, and there, and the distance between them was not empty. It was full of colour.'),
    ],
    source: { label: 'Read on Medium', href: 'https://tobunlateefat.com/in-between-cultures/' },
  },

  {
    _id: 'post-ori-inu-the-silent-companion',
    _type: 'post',
    title: 'Ori Inu — The Silent Companion',
    slug: { _type: 'slug', current: 'ori-inu-the-silent-companion' },
    outlet: 'Lateefat Tobun',
    kind: 'Journal',
    published_at: '2025-04-02T09:00:00.000Z',
    excerpt: 'In Yoruba cosmology, ori inu is the inner self — the companion that travels with you before birth and guides you through life.',
    standfirst: 'A meditation on inner guidance, the Yoruba concept of ori inu, and what it means to trust the part of yourself that does not speak in words.',
    body: [
      block('In Yoruba cosmology, ori inu is the inner self — the personal spirit that accompanies you from before birth and acts as your guide, your counsel, your deepest knowing. It is not the same as instinct, not exactly. It is older than instinct. It is the self you were before circumstance shaped you.'),
      block('I think about ori inu often when I am in the middle of making. There is a moment in every piece where the plan gives way to something else. The sketch does not match the canvas. The colour I chose refuses the surface. And then something shifts — a decision made below the level of reasoning — and the work begins to breathe.'),
      quote('Ori inu does not shout. It does not need to. It has been with you longer than your name.'),
      block('Western art education has a language for this: intuition, flow state, the unconscious. But I find those words clinical against the warmth of what they are trying to describe. Ori inu feels more accurate. It is not a mechanism. It is a companion.'),
      block('I painted a series last year where I stopped planning entirely. No sketches. No colour swatches. I sat with the canvas and waited until something arrived. It was uncomfortable in a way that felt important — the discomfort of trusting rather than controlling.'),
      block('What came out of that series was some of the most honest work I have made. Pieces that I could not fully explain but could fully feel. Pieces that looked like the inside of something rather than the outside.'),
      block('I am still learning to listen. To slow down enough to hear what ori inu is saying before my rational mind crowds it out. That practice — that discipline of listening — is the real studio work. The painting is just what happens when I get it right.'),
    ],
    source: { label: 'Read on site', href: 'https://tobunlateefat.com/ori-inu-the-silent-companion/' },
  },

  {
    _id: 'post-the-faces-we-outgrow',
    _type: 'post',
    title: 'The Faces We Outgrow',
    slug: { _type: 'slug', current: 'the-faces-we-outgrow' },
    outlet: 'Lateefat Tobun',
    kind: 'Journal',
    published_at: '2025-04-28T09:00:00.000Z',
    excerpt: 'Every self we shed leaves a mark. A style abandoned. A way of speaking retired. A version of our face that no longer fits.',
    standfirst: 'On identity as a process of continuous shedding — and why making art is one of the few places we can watch ourselves change in real time.',
    body: [
      block('I have a folder on my phone with photographs of old work. Not for nostalgia — for honesty. I look at it when I am feeling too settled, too sure of my own voice. It is a useful kind of humbling.'),
      block('In the earliest images, everything is cautious. The colours stay within permission. The compositions follow the rules I was taught, obedient to a logic that was not yet mine. I can see myself there, working hard to become something.'),
      block('Further along, something loosens. The palette gets louder. The figures start to break apart and reassemble. You can see the moment I stopped asking for approval from an imagined audience.'),
      quote('Every self we shed leaves a mark. A style abandoned. A way of speaking retired. A version of our face that no longer fits.'),
      block('Portraiture has always interested me because the face is where identity is most legible — and most deceptive. We read each other by faces. But faces change. The face you wore at twenty is not the face you carry now. Growth is partly grief: you leave versions of yourself behind.'),
      block('The series I called The Faces We Outgrow was an attempt to make that process visible. I painted overlapping portraits — the same figure at different registers of becoming, their features layered and translucent, each era of self showing through the next like sediment.'),
      block('What struck me in making it was how much love I felt for the earlier faces. Not longing — love. The compassion you extend to someone who was trying their best with incomplete information. Which is what we all are, always, until we are not anymore.'),
      block('I think that is what art does at its best: it slows time enough for you to be present with your own becoming. To look at who you were and who you are becoming without flinching away from either.'),
    ],
    source: { label: 'Read on site', href: 'https://tobunlateefat.com/the-faces-we-outgrow/' },
  },

  {
    _id: 'post-what-generative-art-taught-me-about-control',
    _type: 'post',
    title: 'What Generative Art Taught Me About Letting Go',
    slug: { _type: 'slug', current: 'what-generative-art-taught-me-about-letting-go' },
    outlet: 'Lateefat Tobun',
    kind: 'Essay',
    published_at: '2025-05-10T09:00:00.000Z',
    excerpt: 'You write the rules. Then the algorithm surprises you. That gap between intention and output is where the interesting things live.',
    standfirst: 'On working with algorithms, learning to trust systems you built, and why the best generative art feels like a collaboration rather than a command.',
    body: [
      block('When I first started writing code for generative art, I expected to feel more in control. I had spent years learning to paint with a brush — an imprecise, unpredictable instrument that responds to pressure and humidity and the specific mood of your wrist that morning. Surely a computer, running clean logical instructions, would give me exactness.'),
      block('It did not. Or rather: it gave me exactness, and then it gave me surprise. And the surprise was the part I could not have predicted.'),
      quote('You write the rules. Then the algorithm surprises you. That gap between intention and output is where the interesting things live.'),
      block('In generative art, you author a system rather than a surface. You define parameters: colour ranges, movement rules, density thresholds, the mathematics of how forms will grow or decay. Then you run it. And what emerges is yours — and also not entirely yours. The algorithm interpreted your instructions through its own logic, found paths through your rules that you had not anticipated.'),
      block('My background in data analytics made me think I would find this process comfortable. I know how systems behave. I understand probability. But knowing that a system will produce variation does not prepare you for the specific beauty of the variation it actually produces. That is always a small shock.'),
      block('The works I am most proud of came from parameters I nearly deleted. A colour range that seemed too harsh. A movement rule that appeared chaotic. I let them run anyway — curiosity overriding taste — and the output rewrote my understanding of what I was trying to make.'),
      block('What generative practice has given me is a working relationship with uncertainty. Not tolerance for it — a relationship. The algorithm is a collaborator, and like any collaborator it will do things you did not ask for. Your job is to stay present enough to recognise when the unexpected thing is better than what you planned.'),
    ],
  },

  {
    _id: 'post-colour-as-language',
    _type: 'post',
    title: 'Colour as Language',
    slug: { _type: 'slug', current: 'colour-as-language' },
    outlet: 'Lateefat Tobun',
    kind: 'Essay',
    published_at: '2025-05-24T09:00:00.000Z',
    excerpt: 'Before I had words for what I was feeling, I had colour. Ochre for homesickness. Deep indigo for a grief that had not yet found its shape.',
    standfirst: 'A personal investigation into why colour carries meaning that words cannot, and how I learned to use it as my primary vocabulary.',
    body: [
      block('I keep a colour journal. Not a sketchbook — just colours. Swatches of paint, fabric samples, screenshots of screens, torn pages from magazines. Each one annotated with a date and sometimes a word. Sometimes no word at all.'),
      block('I started this practice because I noticed that my emotional life arrives in colour before it arrives in language. Before I have a name for something I am feeling, I have already reached for a particular tube of paint. The reaching is the knowing.'),
      quote('Before I had words for what I was feeling, I had colour. Ochre for homesickness. Deep indigo for a grief that had not yet found its shape.'),
      block('Ochre appears frequently in my work. It is a warm, ancient pigment — found in cave paintings, in earth, in skin. For me it carries something specific: the warmth of late afternoon light in a place I am always slightly trying to return to. When I mix it now, I feel that particular quality of longing.'),
      block('This is not arbitrary. Colour science tells us that our responses to colour are partly cultural, partly evolutionary, partly deeply personal. The cultural layer is the most visible — white for mourning in some traditions, for celebration in others. But beneath that is the personal stratum, laid down through specific memory and experience, that is yours alone.'),
      block('I am interested in the conversation between these layers. When I use deep indigo in a portrait, I am drawing on the cultural resonance of that colour — authority, depth, night, mystery — and also on my own private library of associations. The viewer brings their own. A painting becomes a site of overlapping colour vocabularies, each one translating differently.'),
      block('Learning to use colour intentionally — rather than decoratively — took years. It required paying attention not just to what colours look like together but to what they do. How they push and pull. How a warm colour in a cold composition changes the emotional temperature of everything around it. How the same blue reads differently depending on what it is next to, what light it is under, what the viewer brought into the room with them.'),
      block('Colour is never neutral. It is always saying something. My job is to make sure I know what I am saying before I say it.'),
    ],
  },

  {
    _id: 'post-on-making-things-by-hand',
    _type: 'post',
    title: 'On Making Things by Hand in a Digital Age',
    slug: { _type: 'slug', current: 'on-making-things-by-hand-in-a-digital-age' },
    outlet: 'Lateefat Tobun',
    kind: 'Essay',
    published_at: '2025-06-07T09:00:00.000Z',
    excerpt: 'Every time I pick up a brush or pull a needle through cloth, I am choosing slowness. I am choosing the irreducible fact of my own hands.',
    standfirst: 'Why hand-making still matters when everything can be generated — and how working with physical materials keeps me honest about what I am actually doing.',
    body: [
      block('People sometimes ask how I reconcile my work in generative art and digital couture with my practice in painting and textile. The question contains an assumption: that these are opposites, that choosing one means conceding something to the other.'),
      block('I do not experience it that way. I move between physical and digital practice the way I imagine a musician moves between instruments — each one teaches you something the others cannot, and what you learn in one form always migrates back.'),
      quote('Every time I pick up a brush or pull a needle through cloth, I am choosing slowness. I am choosing the irreducible fact of my own hands.'),
      block('Hand-making is honest in a specific way. The brush tells you when your grip is wrong. The fabric resists when you are forcing it. There is immediate feedback from the material — it will not pretend. A digital file is more patient, more forgiving, and that forgiveness is sometimes what you need. But it can also allow you to avoid the thing you are trying to avoid.'),
      block('I painted a series of large canvases last winter in a studio without heating. My hands moved differently in the cold. The marks were less controlled, more urgent. I would not have planned those marks but I could not have generated them either. They were the result of a specific body in a specific room on a specific morning — information that no algorithm can replicate because it was never encoded.'),
      block('This is what hand-making gives you: the record of a body\'s encounter with matter. The painting holds not just the image but the evidence of someone making it — the pressure, the hesitation, the recovery from a mistake. Viewers feel this even when they cannot name it. There is a different quality of attention that handmade work asks for, because there is a different quality of presence embedded in it.'),
      block('Technology has not made this obsolete. If anything, it has made it more precious. We are surrounded by generated surfaces. The handmade stands out not because it is better but because it is traceable — back to a body, back to a decision, back to a morning.'),
    ],
  },

  {
    _id: 'post-digital-couture-when-fashion-meets-algorithm',
    _type: 'post',
    title: 'Digital Couture: When Fashion Meets Algorithm',
    slug: { _type: 'slug', current: 'digital-couture-when-fashion-meets-algorithm' },
    outlet: 'Lateefat Tobun',
    kind: 'Feature',
    published_at: '2025-07-15T09:00:00.000Z',
    excerpt: 'A garment you can never wear in the physical world carries its own kind of truth. It is freed from the compromises of manufacture.',
    standfirst: 'An introduction to digital couture as a creative practice — what it is, why it matters, and why the virtual garment is not a lesser version of the real one.',
    body: [
      block('When I tell people I make digital couture, the first question is usually: but can you wear it? The answer is: not in the conventional sense. And that is exactly the point.'),
      block('Digital couture is the practice of designing garments that exist entirely in digital space — rendered with the precision of haute couture but freed from the constraints of physical material, manufacturing, and the body\'s actual dimensions. The garment can be as impossible as the imagination allows.'),
      quote('A garment you can never wear in the physical world carries its own kind of truth. It is freed from the compromises of manufacture.'),
      block('I came to digital couture from textile art — from a practice rooted in the physical weight of cloth, the hand-feel of fabric, the way colour bleeds across grain. That tactile history shapes everything I do digitally. I cannot un-feel fabric when I am designing a virtual garment. The drape, the weight, the resistance — I simulate it through software but I know it through my hands.'),
      block('This is, I think, what separates digital couture from pure graphic design. It is fashion thinking applied to a virtual medium. The questions I ask are the same questions a couturier asks: how does this sit on the body? What does the movement of this material communicate? What emotion does this silhouette carry? The answers just happen in pixels rather than silk.'),
      block('There is also a freedom in the digital form that I find genuinely exciting. In physical fashion, every design choice is constrained by what materials can do, what manufacture can achieve, what a body can carry. In digital couture, those constraints are optional. You can design with fabrics that change colour in response to sound. You can build garments that grow as the wearer moves. You can create clothing that exists only at a particular moment of light.'),
      block('The workshops I run — Colour to Digital Couture — start with physical drawing, with coloured pencils and real fabric swatches. Participants design on paper first, feeling the colour before they translate it into digital form. I want them to understand that the digital version is not a replacement for the material one. It is a different kind of conversation with the same questions.'),
    ],
  },

  {
    _id: 'post-bradford-streets-my-canvas',
    _type: 'post',
    title: 'Bradford\'s Streets and My Canvas',
    slug: { _type: 'slug', current: 'bradfords-streets-and-my-canvas' },
    outlet: 'Lateefat Tobun',
    kind: 'Journal',
    published_at: '2025-08-03T09:00:00.000Z',
    excerpt: 'Bradford does not photograph like a city that needs saving. It photographs like a city that is already saving itself, quietly, in ways that do not make the news.',
    standfirst: 'On making community murals in Bradford, what public art actually asks of you, and why walls are a different kind of canvas.',
    body: [
      block('Working on a public mural is unlike anything else I do in the studio. The scale alone changes everything. You are not making something that can be moved, stored, rehung. You are making something that belongs to a wall that belongs to a street that belongs to people who never asked for it and now have to live with it every day.'),
      block('That responsibility is something I think about a lot. Public art is a kind of proposition. It says: this corner of your world should look like this. You had better be sure you mean it.'),
      quote('Bradford does not photograph like a city that needs saving. It photographs like a city that is already saving itself, quietly, in ways that do not make the news.'),
      block('The Stronger Together mural — a collaboration with Ruth Agbolade and Molly Harris as part of the Healthy Minds Untold Stories initiative — was made in response to a specific community need. The brief was around mental health, unity, resilience. Those are heavy words. The challenge was to translate them into colour and form without flattening them into slogans.'),
      block('We spent time in conversation before we spent time with paint. Listening to what people in the neighbourhood actually wanted to see, what they felt was missing, what had happened in that space before us. Public art that skips this step tends to look like it arrived from somewhere else. Which it did.'),
      block('Bradford has shaped my understanding of what community means in practice rather than theory. This city is complicated and underestimated and full of people doing extraordinary things in ordinary circumstances. The mural is an attempt to hold that up, to make it visible, to say: this is here, this matters, you are seen.'),
      block('I left the wall feeling like it had taught me as much about my practice as any studio session. Sometimes the best thing a canvas can do is refuse to be yours alone.'),
    ],
  },

  {
    _id: 'post-what-economics-taught-me-about-art',
    _type: 'post',
    title: 'What My Economics Degree Taught Me About Making Art',
    slug: { _type: 'slug', current: 'what-economics-taught-me-about-making-art' },
    outlet: 'Lateefat Tobun',
    kind: 'Essay',
    published_at: '2025-09-20T09:00:00.000Z',
    excerpt: 'Scarcity, trade-offs, marginal utility. The economic concepts I studied in lecture halls turned out to map surprisingly well onto a studio practice.',
    standfirst: 'An unexpected inheritance: how studying economics and data analytics shaped the way I think about art, structure, and the decisions inside a painting.',
    body: [
      block('I studied economics before I studied art formally. Then data analytics. My path into a full creative practice was not linear, and people sometimes look at my CV with a kind of puzzlement — as if these things do not belong in the same story.'),
      block('But they are the same story. The ways I was trained to think in those disciplines have not left me. They live in the practice, not visibly but structurally.'),
      quote('Scarcity, trade-offs, marginal utility. The economic concepts I studied in lecture halls turned out to map surprisingly well onto a studio practice.'),
      block('Economics is fundamentally about constraints and choices. Every agent operates within limits — of resource, of time, of information — and makes decisions accordingly. A painting is exactly this. You have a surface of fixed dimensions. You have a limited number of decisions you can make before the work is overworked. Every mark you put down closes off other marks. There is no neutral move.'),
      block('Data analytics gave me something different: a comfort with pattern, with variance, with the distance between signal and noise. I learned to look at a dataset and ask not just what it shows but what it hides. What is being excluded by the framing? Where is the edge of the known?'),
      block('I ask the same questions of a canvas. What is the composition excluding? Where is the eye being directed and what is it being directed away from? A painting is a dataset with an aesthetic surface — information organised to produce an experience. Understanding that organisation is part of understanding the work.'),
      block('None of this makes the process mechanical. If anything, the analytical framework creates a container for intuition to operate within. When I know why a composition is failing structurally, I can fix the structure and then step back and let the feeling lead. The two modes need each other. Logic without feeling produces furniture. Feeling without logic produces chaos. The practice lives in the tension between them.'),
    ],
  },

  {
    _id: 'post-roots-of-radiance-making',
    _type: 'post',
    title: 'Roots of Radiance: Notes on Making a Textile Work',
    slug: { _type: 'slug', current: 'roots-of-radiance-notes-on-making' },
    outlet: 'Lateefat Tobun',
    kind: 'Studio Notes',
    published_at: '2025-10-30T09:00:00.000Z',
    excerpt: 'Cloth remembers. Every fold is a record of where it has been, who has touched it, what weather it has moved through.',
    standfirst: 'A behind-the-scenes account of creating Roots of Radiance — the material decisions, the failures, and what the finished piece is actually about.',
    body: [
      block('Roots of Radiance began with a question I could not quite put into words: what does inheritance look like when you can hold it?'),
      block('I had been thinking about intergenerational transmission — what we carry forward from the people who came before us without always knowing we are carrying it. The gestures, the preferences, the ways of moving through a room. The things passed down without ever being named.'),
      quote('Cloth remembers. Every fold is a record of where it has been, who has touched it, what weather it has moved through.'),
      block('I chose patterned fabric because fabric carries this kind of history so openly. The textiles I selected — a mixture of ankara prints and plain woven cottons — came from different sources: some bought new, some sourced from older pieces of clothing that had been worn and washed and worn again. The used fabric has a different quality to it. You can feel the time in it.'),
      block('The technique is hand-cutting and layering — fabric cut into organic forms and built up on canvas in strata, each layer a different pattern, a different weight, a different colour temperature. The sculptural folding at the edges was partly planned and partly discovered. I kept pinning and unpinning the corners until the piece told me where it wanted to sit.'),
      block('The first version was too ordered. Too obviously composed. I pulled half of it apart and rebuilt it more instinctively, trusting the materials to find their own arrangement within a loose structure I held. The second version had something the first did not: a quality of having grown rather than been constructed.'),
      block('What Roots of Radiance is about, finally, is this: the visible and invisible inheritance that makes us who we are. The patterns in our families that we recognise and the patterns we do not. The radiance that comes up through the roots whether we tend them consciously or not. The work is an act of gratitude toward those roots. And a reckoning with them.'),
    ],
  },
]

async function seed() {
  console.log(`Creating ${posts.length} blog posts...`)
  const transaction = client.transaction()
  for (const post of posts) {
    transaction.createOrReplace(post)
  }
  const result = await transaction.commit()
  console.log(`✓ Created ${posts.length} posts (transaction: ${result.transactionId})`)
}

seed().catch(err => { console.error(err); process.exit(1) })
