<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { toasts } from 'svelte-toasts';
  import config from '../../env';
  import { axiosInstance } from '../utils/axios';
  import { Button } from 'svelte-materialify';
  // export let isauth = localStorage.getItem('isDAuth');
  import { getContext, onMount } from 'svelte';
  import { authorizeSession } from 'src/utils/authorizeSession';
  import { params } from 'src/utils/queryParams';
  let { theme } = getContext('theme');

  onMount(() => {
    let element: HTMLBodyElement = document.querySelector('.navbar');
    element.style.display = 'none';
    if ($authorizeSession == false) {
      const parameters = new URLSearchParams(window.location.search);
      let newParams = {
        client_id: parameters.get('client_id'),
        redirect_uri: parameters.get('redirect_uri'),
        response_type: 'code',
        grant_type: parameters.get('grant_type'),
        state: parameters.get('state'),
        scope: parameters.get('scope'),
        nonce: parameters.get('nonce')
      };
      params.set(newParams);
      navigate('/redirect', { replace: true });
    }
  });
  function authorizeApp() {
    let formBody = [];
    for (var property in $params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent($params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    let finalParams = formBody.join('&');
    axiosInstance({
      method: 'post',
      url: `${config.backendurl}/oauth/authorize`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: finalParams
    }).catch(error => {
      let message;
      if (error.response) {
        message = error.response.data.message;
      } else if (error.request) {
        message = error.request.data.message;
      } else {
        message = 'Something went wrong, please try again!';
      }
      toasts.add({
        title: 'Oops',
        description: message,
        duration: 10000, // 0 or negative to avoid auto-remove
        placement: 'bottom-right',
        type: 'error',
        showProgress: true,
        theme: localStorage.getItem('DAuth-theme')
      });
    });
  }
  function denyAccess() {
    location.replace($params.redirect_uri);
  }
</script>

<main>
  <div class="authoriseAppContainer">
    <div class="headerMain">
      <div class="greetingHeader">
        <div id="deltaLogo">
          <img
            class="delta_logo"
            id="authoriseDeltaLogo"
            src="https://delta.nitt.edu/images/deltaLogoGreen.png"
            alt="Delta logo"
          />
          <h6 id="authoriseTitle">DAuth</h6>
        </div>
        <div id="userInfo">
          <img
            id="userProfileIcon"
            src="https://gravatar.com/avatar/c9b235a9c585af737b7f4ba185ea27df.jpg?d=retro"
            alt="profileImage"
          />
          <span id="userGreeting">Hi User!</span>
          <p>user@gmail.com</p>
        </div>
      </div>
      <div class="mainContent">
        <div class="allowAccess">
          <p>
            <a href="/" id="thirdPartApp">Festember</a> want to access your profile info.
          </p>
        </div>
        <div class="accessInfo">
          <p>
            By clicking allow button, you are allowing them to access your DAuth profile
            information. You can revoke the access to this or any other app in <a
              href="/"
              id="userDashboard">My Account</a
            >
          </p>
        </div>
        <div class="accessButtons">
          <Button
            Tile
            id="denyButton"
            on:click={e => {
              denyAccess();
            }}>Deny</Button
          >
          <Button
            Tile
            id="allowButton"
            on:click={e => {
              authorizeApp();
            }}>Allow</Button
          >
        </div>
      </div>
    </div>
  </div>
</main>
