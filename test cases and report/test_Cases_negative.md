<table>
    <tr>
        <th>id) Description</th>
        <th>Precondition</th>
        <th>Step</th>
        <th>Expected Result</th>
        <th>Actual Result</th>
        <th>Comment</th>
    </tr>
    <tr>
        <td>2.1) Login with invalid credentials</td>
        <td></td>
        <td>1. Go to login page<br> 2. Type invalid username<br> 3. Type invalid password<br> 4. Click on sign in</td>
        <td>Error message is displayed and login fails</td>
        <td>Passed</td>
        <td></td>
    </tr>
    <tr>
        <td>2.2) Create new space with already existing name</td>
        <td></td>
        <td>1. Go to spaces page<br> 2. Wihing Create new space, click on Private or public space<br> 3. Rename the default name using one already existing name <br> 4. Click on spaces in the nav bar</td>
        <td>Space cannot be created and the amount of spaces remain the same</td>
        <td>Failed</td>
        <td>The name cannot be used but after clicking on create space, the space is automatically created with the default name, therefore the amount increases anyway</td>
    </tr>
    <tr>
        <td>2.3) Create new space using spacial characteres in the name</td>
        <td></td>
        <td>1. Go to spaces page<br> 2. Wihing Create new space, click on Private or public space<br> 3. Rename the default name using special characters in the name <br> 4. Click on spaces in the nav bar</td>
        <td>Space cannot be created and the amount of spaces remain the same</td>
        <td>Failed</td>
        <td>The name cannot be used but after clicking on create space, the space is automatically created with the default name, therefore the amount increases anyway</td>
    </tr>
    <tr>
        <td>2.4) Delete space typing wrong name </td>
        <td>Having existing spaces</td>
        <td>1. Go to spaces page <br> 2. Click on any space<br> 3. Click on the 3dots menu <br> 4. Click on delete space <br> 5. type the space name to be deleted incorrectly <br> 6. Click on confirmation button <br> </td>
        <td>Space cannot be deleted because confirmation button is disabled </td>
        <td>Passed</td>
        <td></td>
    </tr>
</table>