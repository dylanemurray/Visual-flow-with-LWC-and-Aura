({
    handleSub : function(component, event, helper) {       
        var proIds = [];
        var pubsub = component.find('pubsub');
        var callback = $A.getCallback(function(productIds) {           
            proIds = productIds;
            console.log(proIds);
            component.set("v.showModal", true);
            var flow = component.find("oppFlow");
            var inputVariables = [
                {
                    name : 'productIds',
                    type : 'String',
                    value : proIds
    
                }
            ];
            flow.startFlow("newOpportunity", inputVariables);
        });
        pubsub.registerListener('passIds', callback);
    },

    handleDestroy: function(component) {
        var pubsub = component.find('pubsub');
        pubsub.unregisterAllListeners();
    }, 

    closeModel: function(component, event, helper) { 
        component.set("v.showModal", false);
     }
})
