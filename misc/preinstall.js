if (process.env.npm_execpath.indexOf('npm') === -1) {
  throw new Error(`

  ####################################################
  #                                                  #
  #  Please use Npm > 6.5.0 to install dependencies  #
  #                                                  #
  #  1. Install npm                                  #
  #  2. Run 'npm install'                            #
  #                                                  #
  ####################################################
  `);
}
