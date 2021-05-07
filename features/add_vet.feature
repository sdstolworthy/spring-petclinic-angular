Feature: Add a new vet
    As a clinic manager
    I should add new veterinarians to my clinic

    # Background: I have a clinic with these specialties
    #     Given the following specialities:
    #         | specialities |
    #         | radiology    |
    #         | surgery      |
    #         | dentistry    |

    #     And I am on the Add New Veterinarian page
    Scenario: Add new veterinarians with specializations
        Given I am on the Add New Veterinarian page
        When I type in Wuxin for First Name
        When I type in Zeng for Last Name
        When I select radiology from the Type dropdown
        Then I should be able to click Save Vet
        Then I should see Wuxin Zeng added to the list of veterinarians

# Examples:
#     | First Name | Last Name | Specialty | Name       |
#     | Wuxin      | Zeng      | radiology | Wuxin Zeng |
# | Spencer    | Stolworthy | surgery   | Spencer Stolworthy |