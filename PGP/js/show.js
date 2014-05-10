/**
 * @fileOverview Privly Application specific code.
 * This file modifies the privly-web adapter found
 * in the shared directory. For more information
 * about the PGP application, view the README.
 **/
privlyTooltip.appName = "PGP";

/**
 * Application specific content type handler. This function
 * processes the encrypted markdown that should have been returned by
 * the server.
 *
 * @param {jqHR} response The response from the server for the associated
 * data URL.
 */

/**
 * The callbacks assign the state of the application.
 *
 * This application can be placed into the following states:
 * 1. Content Returned: The server returned the content for display.
 *    Callback=contentReturned
 */
var callbacks = {

  /**
  * Process the post's content returned from the remote server.
  *
  * @param {object} response The response from the remote server. In cases
  * without error, the response body will be in response.response.
  */
  processContent: function(response) {
    
    if( response.jqXHR.status === 200 ) {
      
      var url = state.webApplicationURL;
      var json = response.json;
      
      privlyNetworkService.permissions.canShow = true;
      
      if( json === null ) return;
      
      if(json.structured_content !== undefined) {
        PersonaPGP.decrypt(json.structured_content,function(cleartext){
          $("#edit_text").val(cleartext);

          var markdownHTML = markdown.toHTML(cleartext);
          $('div#cleartext').html(markdownHTML);
        });
      } else {
        $('div#cleartext').text("The data behind this link is corrupted.");
        return;
      }
  },
}

// Initialize the application
document.addEventListener(
  'DOMContentLoaded',
  function(){callbacks.pendingContent(processContent)}
);
