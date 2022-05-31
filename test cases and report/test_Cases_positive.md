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
        <td>1.1) Login with valid credentials</td>
        <td>Having existing account</td>
        <td>1. Go to login page<br> 2. Type username<br> 3. Type password<br> 4. Click on sign in</td>
        <td>Login successfully</td>
        <td>Passed</td>
        <td></td>
    </tr>
    <tr>
        <td>1.2) Create new private space</td>
        <td></td>
        <td>1. Go to spaces page<br> 2. Wihing Create new space, click on Private space<br> 3. Rename the default name (optional) <br> 4. Click on spaces in the nav bar</td>
        <td>Space created successfully</td>
        <td>Passed</td>
        <td>After clicking on create space there's no option to cancel this action. The space is automatically created with the deafult name</td>
    </tr>
    <tr>
        <td>1.3) Create new public space</td>
        <td></td>
        <td>1. Go to spaces page<br> 2. Wihing Create new space, click on Public space<br> 3. Rename the default name (optional) <br> 4. Click on spaces in the nav bar</td>
        <td>Space created successfully</td>
        <td>Passed</td>
        <td>After clicking on create space there's no option to cancel this action. The space is automatically created with the deafult name</td>
    </tr>
    <tr>
        <td>1.4) Delete space </td>
        <td>Having existing spaces</td>
        <td>1. Go to spaces page <br> 2. Click on any space<br> 3. Click on the 3dots menu <br> 4. Click on delete space <br> 5. type the space name to be deleted <br> 6. Click on confirmation button  <br> </td>
        <td>Space deleted successfully</td>
        <td>Passed</td>
        <td></td>
    </tr>
    <tr>
        <td>1.5) Delete all spaces </td>
        <td>Having existing spaces</td>
        <td>1. Go to spaces page <br> 2. Run DELETE Api method over each space name <br> </td>
        <td>All spaces deleted successfully</td>
        <td>Passed</td>
        <td></td>
    </tr>
</table>