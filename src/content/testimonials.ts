// Customer testimonials. Named reviews carried real attribution on the home
// page; the rest are verified reviews shown with a neutral attribution.

export type Testimonial = { name: string; message: string; role?: string };
export const allTestimonials: Testimonial[] = [
  { name: "Zachary Tinley", message: `We have two pools that Pool Smith services and maintains. Since hiring them, my pools are spotless and free from debris, the salt chemistry is good, and the water feels clear and fresh.`, role: "Verified Customer" },
  { name: "Paul Bernstein", message: `Excellent service throughout! The pool tech was so thorough in explaining how my pool works and the cleaning process. They left my pool looking clean and ready.`, role: "Verified Customer" },
  { name: "Jackie Frazier", message: `Very professional and great customer service. They are honest and trustworthy, and always treat my pool like their very own.`, role: "Verified Customer" },
  { name: "Pool Smith Customer", message: `They were professional and informative on the phone. We agreed quickly on a price and service day. There was no pressure or contract, just good service. They come weekly and we are very pleased.`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `I have used other pool services that I was not happy with, but these guys did a great job. They are always on time, take care of everything and their pricing is very fair.`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `I would use Pool Smith again! I had my pool resurfaced; they started and finished when they said they would. They showed up on time and on schedule. Keven was wonderful; always called me back within seconds of leaving a message or …`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `Always professional, have been fabulous in solving a variety of pool issues. We have been using them for a few years! Highly recommend their service techs and their customer service reps!!!`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `after taking lots of advises and estimates from different seivices giving quote of thousand dollars for my Pool Light Repair, I finally got Pool Smith and Talked to Mark and he just advised me on phone to go to pool units and …`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `Mike came out for pool school today and was very knowledgeable! He did a great job not only explaining how to care for our pool but showing us as well. We had him scheduled for 8am but he didn't show. A few hours later he called us an was …`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `Thank you so much for the information on freezing conditions & what to watch for with our pool. You take such great care of us. Thanks so much!`, role: "Verified Review" },
  { name: "Pool Smith Customer", message: `We have been very pleased with Pool Smith. He is very professional and he will always leave a list of everything he has done to our pool. He does great work and he is very easy to work with.`, role: "Verified Review" },
];