[lit-html 1 - tagged templates]:(https://bigfrontend.dev/problem/lit-html-1-tagged-templates)
                                 
/**
The function html is use to concatenate strings and variables into a string.
/**

function html(strs, ...vals) {
  let str = ''
  // Iterating through the arrays 
  for(let i = 0; i < strs.length; i++) {
    //concatenates strings and variables in order
    //If a variable does not exist, appends an empty string instead
    str += strs[i] + (vals[i] !== undefined ? vals[i] : '')
  }
  //returns the concatenated HTML string
  return str;
}

/**
The function render serves to display the result within a specified container. 
/**
  
function render(result, container) {
  //setting the innerHTML property of the container to the value of result
  container.innerHTML = result
}
