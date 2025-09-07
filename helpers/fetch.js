
export async function getStories() {
  // get the cms data from the webflow page collections item
  const cmsItems = document.querySelectorAll('.cms-data-item');
  
  // Initialize an array to hold all the stories
  const allStories = [];

  // Loop through each script tag and make an object
  cmsItems.forEach( item => {
    // console.log("see it", item );
    const obj = {
      title: item.getAttribute('data-title'),
      body: item.getAttribute('data-body'),
      tags: item.getAttribute('data-tags'),
      links: item.getAttribute('data-links'),
      chapter: item.getAttribute('data-chapter'),
      cutout: item.getAttribute('data-cutout'),
      slug: item.getAttribute('data-slug'),
      cardElem: {},
    }

    // add the obj to the allStories array
    allStories.push( obj );

  });
  
  return allStories
}
