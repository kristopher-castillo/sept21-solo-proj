'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
        "Notes",
        [
          {
            title: "Dinner Plans",
            content: "Lomo tofu sustainable viral literally vice glossier tbh DIY cronut. Kinfolk man bun cliche listicle messenger bag synth meggings letterpress asymmetrical poutine dreamcatcher humblebrag. Artisan hammock prism mustache. Skateboard ugh craft beer tote bag. Selfies narwhal cred cornhole. Yuccie shabby chic marfa art party la croix kogi cred keffiyeh fashion axe whatever meditation mustache tumeric food truck try-hard. Roof party pok pok hella jean shorts shoreditch, blog pinterest intelligentsia. Prism bicycle rights fashion axe, semiotics cliche blue bottle health goth. Chia tattooed asymmetrical taxidermy, vice venmo hashtag pour-over biodiesel ugh semiotics woke. Lumbersexual +1 pop-up sustainable viral lomo bicycle rights cornhole shoreditch. Freegan tumeric fixie before they sold out, tilde bicycle rights 8-bit VHS sustainable 90's austin chia shaman deep v. Everyday carry artisan church-key whatever chambray, poutine keffiyeh shaman flexitarian raw denim migas next level. Tacos cred semiotics umami crucifix kickstarter. Salvia tousled intelligentsia, drinking vinegar flexitarian biodiesel pour-over small batch bespoke skateboard adaptogen vexillologist tote bag marfa waistcoat. YOLO jean shorts pitchfork gluten-free celiac stumptown tumeric distillery bicycle rights scenester. Church-key pork belly vegan, tilde gochujang polaroid disrupt pug pour-over pickled artisan craft beer biodiesel tbh hashtag. Plaid schlitz chambray keffiyeh street art trust fund selvage la croix sartorial enamel pin. Biodiesel you probably haven't heard of them chia authentic brunch thundercats, enamel pin poke drinking vinegar edison bulb. Mumblecore quinoa snackwave, selfies celiac church-key tumblr asymmetrical craft beer try-hard gochujang vinyl gluten-free XOXO succulents. Iceland chia keffiyeh, portland typewriter hella skateboard 8-bit kombucha narwhal direct trade gluten-free disrupt farm-to-table blue bottle. Vinyl mumblecore typewriter tofu ugh listicle. Artisan literally wolf pour-over wayfarers authentic crucifix. Direct trade neutra +1, sustainable kinfolk jianbing cornhole master cleanse raclette selvage polaroid helvetica. Tilde keffiyeh typewriter shabby chic activated charcoal you probably haven't heard of them, pabst cold-pressed hammock gochujang scenester. 3 wolf moon direct trade shabby chic pop-up poke truffaut chia letterpress XOXO. Microdosing drinking vinegar cronut VHS roof party mustache. Kickstarter hexagon semiotics, palo santo schlitz pour-over snackwave glossier chartreuse jean shorts salvia sartorial adaptogen normcore marfa. Subway tile 8-bit DIY venmo edison bulb chicharrones you probably haven't heard of them iceland shabby chic shaman beard twee la croix mumblecore church-key.",
            userId: 1,
            notebookId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Grocery List",
            content: "Whatever keytar jianbing, PBR&B knausgaard bespoke shoreditch fashion axe banjo. Blog waistcoat next level vice helvetica tattooed four loko brunch franzen. VHS drinking vinegar hexagon edison bulb banjo four loko. Chicharrones austin dreamcatcher humblebrag wayfarers cronut. Authentic hoodie blue bottle semiotics poutine direct trade normcore shaman. Cred tote bag kogi, health goth meditation adaptogen flannel deep v viral. Mustache selfies franzen tattooed mixtape yr readymade williamsburg. Forage raw denim truffaut, af hoodie fashion axe man braid letterpress succulents direct trade chambray locavore. Fixie pickled yuccie, iceland viral VHS snackwave venmo twee polaroid. Edison bulb tilde occupy butcher organic la croix pop-up sriracha squid authentic mustache. DIY keffiyeh seitan street art microdosing 3 wolf moon leggings roof party. Trust fund health goth put a bird on it bitters, tbh gluten-free blue bottle cardigan. Fingerstache dreamcatcher ugh taiyaki lyft jean shorts. Keytar snackwave kickstarter, beard pork belly vice next level copper mug forage cornhole kogi cronut. Ethical gochujang snackwave slow-carb vaporware affogato synth iPhone. Helvetica shoreditch migas pinterest salvia hammock vexillologist yuccie 90's wolf hashtag chillwave. Semiotics umami art party unicorn, copper mug single-origin coffee master cleanse. Austin tofu synth tousled brunch 8-bit venmo skateboard gochujang meditation shaman readymade chartreuse. Brooklyn chillwave salvia plaid occupy crucifix bitters typewriter kinfolk art party. Venmo waistcoat coloring book vinyl swag tofu locavore stumptown succulents offal. Small batch pickled vape, jean shorts hexagon sustainable cold-pressed kitsch 8-bit intelligentsia direct trade. Lomo cornhole blog taxidermy kickstarter, kogi poutine austin pork belly actually four loko. Mustache iceland letterpress, XOXO polaroid ramps biodiesel ethical meh poke. Put a bird on it flannel glossier mumblecore, bushwick offal sustainable farm-to-table narwhal. Put a bird on it tbh poutine blue bottle tote bag dreamcatcher. Food truck williamsburg microdosing brooklyn. Next level jean shorts edison bulb humblebrag man bun 8-bit plaid YOLO ennui wolf skateboard small batch palo santo vice. Swag single-origin coffee truffaut lyft pinterest vice semiotics prism.",
            userId: 1,
            notebookId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Daily Affirmation",
            content: "Authentic prism taiyaki farm-to-table chartreuse. Hell of tofu cray fanny pack williamsburg seitan selfies chia tbh polaroid vice tousled copper mug. Bushwick activated charcoal narwhal, XOXO artisan lyft tousled actually pickled blue bottle try-hard man braid shabby chic. Yr synth health goth chia gentrify, actually banjo. Hexagon craft beer narwhal marfa. Pour-over squid gentrify polaroid. Crucifix hashtag enamel pin fixie ethical VHS copper mug messenger bag. Stumptown lyft godard vape kombucha cornhole, organic dreamcatcher pop-up locavore lomo. Adaptogen keytar jean shorts yuccie master cleanse edison bulb microdosing pabst lyft.",
            userId: 2,
            notebookId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Short Story Draft",
            content: "YOLO gastropub fashion axe jianbing. Chia tumblr brunch butcher selfies. Before they sold out marfa lomo quinoa master cleanse ramps deep v. Affogato vexillologist craft beer, four loko green juice letterpress tofu helvetica selvage. Yuccie crucifix af hashtag venmo williamsburg. Cronut hammock banjo selvage. Prism gastropub semiotics vegan kitsch man bun actually. Next level hella snackwave hammock, schlitz sustainable gluten-free keytar knausgaard vape art party. Williamsburg bushwick pickled stumptown shaman copper mug tattooed selfies distillery plaid pork belly gastropub tousled. Lomo paleo tousled, pork belly kinfolk umami keffiyeh bespoke 8-bit helvetica meh farm-to-table tattooed fixie. Woke sustainable messenger bag gochujang health goth jianbing cray banh mi chillwave plaid yr kogi DIY yuccie.",
            userId: 2,
            notebookId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete("Notes", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
    
  }
};
