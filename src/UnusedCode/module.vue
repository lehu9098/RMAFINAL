<v-card>
  <v-card-title>
    <span class="headline">Sign Up</span>
  </v-card-title>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 sm6 md6>
          <v-text-field label="Legal first name" required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-text-field
            label="Legal last name"
            hint="example of persistent helper text"
            persistent-hint
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Email" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Phone Number" required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md12>
          <v-select
            :items="['0-17', '18-29', '30-54', '54+']"
            label="Age"
            required
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <small>All fields must be filled out</small>
  </v-card-text>
  <v-card-actions>
    <v-btn width="200px" inline-block color="grey lighten-1" flat @click="dialog = false">Cancel</v-btn>
    <v-spacer></v-spacer>
    <v-btn width="200px" inline-block color="grey lighten-1" flat @click="dialog = false">Sign Up</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
   </v-card-actions>
 </v-card>
