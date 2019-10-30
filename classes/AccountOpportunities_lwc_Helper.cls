public with sharing class AccountOpportunities_lwc_Helper {   
    @AuraEnabled(cacheable=true)
    public static List<Product2> returnProducts(){
        List<Product2> result = [SELECT Id, Name, Family, Description, ProductCode FROM Product2];

        return result;
    }
}