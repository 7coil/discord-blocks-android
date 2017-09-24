package com.moustacheminer.discord_blocks;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.ActionBar;
import android.util.Log;
import android.view.Menu;

import com.google.blockly.android.AbstractBlocklyActivity;
import com.google.blockly.android.codegen.CodeGenerationRequest;
import com.google.blockly.android.codegen.LoggingCodeGeneratorCallback;
import com.google.blockly.model.DefaultBlocks;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

/**
 * Created by leondro on 9/23/17.
 */

public class Workspace extends AbstractBlocklyActivity {
    private static final String TAG = "DiscordBlocks";

    private static final String SAVE_FILENAME = "simple_workspace.xml";
    private static final String AUTOSAVE_FILENAME = "simple_workspace_temp.xml";

    // Add custom blocks to this list.
    private static final List<String> JAVASCRIPT_GENERATORS = Arrays.asList (
            "blocks/blockgen.js",
            "blocks/defaultgen.js"
    );

    private static final List<String> BLOCKGEN_THING = Arrays.asList (
            "blocks/blockdef.json",
            "blocks/defaultdef.json",
            "default/colour_blocks.json",
            "default/list_blocks.json",
            "default/logic_blocks.json",
            "default/loop_blocks.json",
            "default/math_blocks.json",
            "default/procedures.json",
            "default/test_blocks.json",
            "default/text_blocks.json",
            "default/variable_blocks.json"
    );

    CodeGenerationRequest.CodeGeneratorCallback mCodeGeneratorCallback =
        new CodeGenerationRequest.CodeGeneratorCallback() {
            @Override
            public void onFinishCodeGeneration(final String generatedCode) {
                Log.w(TAG, generatedCode);
                Intent intent = new Intent(getApplicationContext(), Runtime.class);
                intent.putExtra("js", generatedCode);
                startActivity(intent);
            }
        };;

    @NonNull
    @Override
    protected List<String> getBlockDefinitionsJsonPaths() {
        return BLOCKGEN_THING;
    }

    @NonNull
    @Override
    protected String getToolboxContentsXmlPath() {
        return "blocks/toolbox.xml";
    }

    @NonNull
    @Override
    protected List<String> getGeneratorsJsPaths() {
        return JAVASCRIPT_GENERATORS;
    }

    @NonNull
    @Override
    protected CodeGenerationRequest.CodeGeneratorCallback getCodeGenerationCallback() {
        // Uses the same callback for every generation call.
        return mCodeGeneratorCallback;
    }

    /**
     * Optional override of the save path, since this demo Activity has multiple Blockly
     * configurations.
     * @return Workspace save path used by SimpleActivity and SimpleFragment.
     */
    @Override
    @NonNull
    protected String getWorkspaceSavePath() {
        return SAVE_FILENAME;
    }

    /**
     * Optional override of the auto-save path, since this demo Activity has multiple Blockly
     * configurations.
     * @return Workspace auto-save path used by SimpleActivity and SimpleFragment.
     */
    @Override
    @NonNull
    protected String getWorkspaceAutosavePath() {
        return AUTOSAVE_FILENAME;
    }


    @Override
    protected int getActionBarMenuResId() {
        return R.menu.workspace;
    }
}
